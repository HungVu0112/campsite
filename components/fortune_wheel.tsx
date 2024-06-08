'use client';

import { useRef, useEffect, useState } from 'react';
import { Chart, ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import { BiSolidPaperPlane } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import 'chart.js/auto';
import Image from 'next/image';

export default function FortuneWheel() {
  const router = useRouter();
  const [cityId, setCityId] = useState<number>();
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart<'pie'> | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalValue, setFinalValue] = useState('どこに行けばいいかな。。スピンしてみるか？');

  const cityList = ["北海道・東北", "関東", "北陸・甲信越", "東海", "関西", "中国・四国", "九州・沖縄"];

  const rotationValues = [
    { minDegree: 0, maxDegree: 270/7, value: 2 },
    { minDegree: 270/7, maxDegree: 90, value: 1 },
    { minDegree: 90, maxDegree: 990/7, value: 7 },
    { minDegree: 990/7, maxDegree: 1350/7, value: 6 },
    { minDegree: 1350/7, maxDegree: 1710/7, value: 5 },
    { minDegree: 1710/7, maxDegree: 2070/7, value: 4 },
    { minDegree: 2070/7, maxDegree: 2430/7, value: 3 },
    { minDegree: 2430/7, maxDegree: 360, value: 2 },
  ];

  const data = [16, 16, 16, 16, 16, 16, 16];
  const pieColors = ['#8B4513', ' #CD853F', '#8B4513', '#CD853F', '#8B4513', '#CD853F', '#8B4513'];

  const calculateCenterAngle = (index: number, total: number) => {
    const startAngle = -90;
    const angle = (2 * 180) / total;
    return startAngle + index * angle + angle / 2;
  };

  useEffect(() => {
    if (wheelRef.current) {
      const chartInstance = new Chart<'pie'>(wheelRef.current, {
        plugins: [ChartDataLabels as any],
        type: 'pie',
        data: {
          labels: cityList,
          datasets: [
            {
              backgroundColor: pieColors,
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 0 },
          plugins: {
            tooltip: {
              enabled: false,
            },
            legend: {
              display: false,
            },
            datalabels: {
              color: '#ffffff',
              formatter: (value, context) => {
                const labels = context.chart.data.labels;
                return labels ? labels[context.dataIndex] as string : '';
              },
              font: { 
                size: 16,
                weight: 700
              },
              rotation: (context) => {
                const chart = context.chart;
                const angle = calculateCenterAngle(context.dataIndex, chart.data.datasets[0].data.length);
                return angle;
              },
            },
          },
        },
      });

      setChart(chartInstance);

      return () => {
        chartInstance.destroy();
      };
    }
  }, [wheelRef]);

  const valueGenerator = (angleValue: number) => {
    for (let i of rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setFinalValue(`${cityList[i.value - 1]} か。。`);
        setCityId(i.value);
        setIsSpinning(false);
        break;
      }
    }
  };

  const handleSpin = () => {
    if (chart && !isSpinning) {
      setIsSpinning(true);
      setFinalValue('。。。');
      let randomDegree = Math.floor(Math.random() * 360);
      let count = 0;
      let resultValue = 101;

      const rotationInterval = setInterval(() => {
        const currentRotation = (chart.options.rotation || 0) + resultValue;
        chart.options.rotation = currentRotation;

        // Update the data label rotation
        if (chart.options.plugins && chart.options.plugins.datalabels) {
            chart.options.plugins.datalabels.rotation = (context) => {
                const chart = context.chart;
                const angle = calculateCenterAngle(context.dataIndex, chart.data.datasets[0].data.length);
                return angle + currentRotation;
            };
        }

        chart.update();

        if (chart.options.rotation >= 360) {
          count += 1;
          resultValue -= 5;
          chart.options.rotation = 0;
        } else if (count > 15 && Math.floor(chart.options.rotation) === randomDegree) {
          valueGenerator(randomDegree);
          clearInterval(rotationInterval);
        }
      }, 10);
    }
  };

  return (
      <div className="relative w-full h-full">
        <canvas ref={wheelRef}></canvas>
        <button className='mochiy-pop-one absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70px] h-[70px] rounded-full bg-[#FFF2D7] text-[#c66e16] font-bold' onClick={handleSpin} disabled={isSpinning}>スピン</button>
        <TbArrowBadgeLeftFilled className='absolute top-[50%] text-yellow-300 text-[128px] right-[-60px] -translate-y-[50%]'/>
        <div id="final-value" className='text-[#A67B5B] flex flex-col items-center justify-center mochiy-pop-one p-4 font-semibold absolute right-[-300px] top-[80px] w-[240px] h-[120px] border border-gray-200 rounded-md shadow-md bg-white'>
            <p>{finalValue}</p>
            {!isSpinning && finalValue != "どこに行けばいいかな。。スピンしてみるか？" ?
                <button onClick={() => router.replace(`/home/city/${cityId}`)} className='flex items-center justify-center gap-1 text-sm hover:opacity-80 mt-2 p-1 w-[140px] rounded-full bg-[#FED8B1] text-[#6F4E37]'>
                    行ってみよう
                    <BiSolidPaperPlane className='text-[16px] mb-[4px]'/>
                </button>
                : <></>
            }
        </div>
        <div className='bg-white absolute right-[-320px] top-[210px] w-[25px] h-[25px] rounded-full shadow-md border border-gray-200'></div>
        <div className='bg-white absolute right-[-340px] top-[240px] w-[15px] h-[15px] rounded-full shadow-md border border-gray-200'></div>
      </div>
  );
}
