import { MdEmojiPeople } from "react-icons/md";
import { PiUserSoundFill } from "react-icons/pi";
import { MdCleaningServices } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaTree } from "react-icons/fa";
import { TbCampfireFilled } from "react-icons/tb";

export default function Guide() {
    return (
        <div className="w-full py-16 px-32 mochiy-pop-one bg-[#F8F4E1] min-h-[100vh]">
            <div className="text-center">
                <h1 className="text-[36px] text-[#543310] font-bold">守ろう！キャンプを楽しむための6つのマナー</h1>
                <p className="text-gray-500 dark:text-[#543310]"></p>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[#543310]"></hr>
                <p className="text-gray-500 dark:text-[#543310]"></p>
            </div>
            <div className="mt-20">
                <p className="text-[#74512D] font-semibold">では、どのキャンプ場にも共通する基本的なマナーとはどのようなものなのでしょうか。</p>
                <p className="text-[#74512D] font-semibold">こちらでは、これさえ押さえてけば安心なキャンプの基本マナーを6つご紹介します。</p>
                <div className="mt-8 text-[#74512D] font-semibold flex flex-col gap-3">
                    <div className="flex h-[30px] items-center gap-2">
                        <MdEmojiPeople className="text-xl"/>
                        <p className="mt-[4px]">キャンプ場では挨拶をしよう</p>
                    </div>
                    <div className="flex h-[30px] items-center gap-2">
                        <PiUserSoundFill className="text-xl"/>
                        <p className="mt-[4px]">大声で騒がない！隣の利用者や時間帯に気を配ろう</p>
                    </div>
                    <div className="flex h-[30px] items-center gap-2">
                        <MdCleaningServices className="text-xl"/>
                        <p className="mt-[4px]">炊事場などの共用部分はキレイに使う</p>
                    </div>
                    <div className="flex h-[30px] items-center gap-2">
                        <FaTrashAlt className="text-xl"/>
                        <p className="mt-[4px]">ゴミは必ずキャンプ場の指示に従って処理する</p>
                    </div>
                    <div className="flex h-[30px] items-center gap-2">
                        <FaFire className="text-xl"/>
                        <p className="mt-[4px]">焚き火・炭の処理のルールは必ず確認</p>
                    </div>
                    <div className="flex h-[30px] items-center gap-2">
                        <FaTree className="text-xl"/>
                        <p className="mt-[4px]">自然を守るのが第一！これからもキャンプができる場所に</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <MdEmojiPeople className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">キャンプ場では挨拶をしよう</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>挨拶というのは、キャンプに限らずどんな場面においても大切なものです。</p>
                        <p>特にキャンプシーズンになると、キャンプ場を利用する人も多くなるので当然、テントの距離なども近くなります。</p>
                        <p>そのような場合に、何も言わずに近くでテントを張られてしまうよりも、何か一声かけてから行った方が相手も気持ちがいいものです。</p>
                        <p>長く話をする必要はありません。ただ一言挨拶をするだけで、もしもの場合のコミュニケーションも取りやすくなります。</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <PiUserSoundFill className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">大声で騒がない！隣の利用者や時間帯に気を配ろう</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>泊りがけのキャンプで家族や仲間たちと、さまざまなことを語り合ってついつい、大声で盛り上がってしまうという気持ちはわかります。</p>
                        <p>しかし、夜や早朝の時間帯に騒がしくしてしまうと、周囲の利用者の迷惑となります。</p>
                        <p>誰もが騒ぐために集まっているわけではないので、その点は考慮が必要です。</p>
                        <p>また、音楽をかけて雰囲気を出したいと考えている方もいるでしょう。しかし、キャンプ場によっては終日、音楽を禁止しているところもあります。事前にしっかりとルールを調べておきましょう。</p>
                        <p>せっかく大きなスピーカーを持ってきたのに……ということにならないためにも、事前のルール確認が大切です。</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <MdCleaningServices className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">炊事場などの共用部分はキレイに使う</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>キャンプ場には、炊事場が用意されている施設が多いです。</p>
                        <p>調理道具や材料を持ち寄って、仲間と楽しく料理を作るひとときはキャンプの醍醐味でしょう。</p>
                        <p>しかし、料理が完成して満足してしまい、そのあとの後片付けを怠ってしまうケースが多いようです。</p>
                        <p>そうすると当然、共用部分が汚れてしまい、後で同じ場所を利用する方が非常に迷惑してしまいます。</p>
                        <p>自分たちが楽しむことばかりではなく、他の利用者への気遣いを忘れず、「来た時よりもきれいにして帰る」という気持ちを持って利用しましょう。</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <FaTrashAlt className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">ゴミは必ずキャンプ場の指示に従って処理する</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>キャンプで出たゴミは持ち帰ることが基本のマナーです。</p>
                        <p>しかしキャンプ場によっては、ゴミ捨て場が用意されていることもあります。その場合はきちんと分別をして、ルールを守って処理をしましょう。</p>
                        <p>驚くべきことですが最近、キャンプ場における粗大ゴミの不法投棄が問題となっています。</p>
                        <p>壊れたり、使わなくなったキャンプ道具を放置してそのまま帰宅してしまうというものです。</p>
                        <p>キャンプ場は屋外だからといって、何をしてもいい場所ではありません。</p>
                        <p>運営の方の土地を借りているということを意識して、必ずゴミは残さずに帰るようにしましょう。</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <FaFire className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">焚き火・炭の処理のルールは必ず確認</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>焚き火はキャンプで最も楽しいアクティビティの一つです。</p>
                        <p>しかし、火や炭を正しく処理をしないと、火事が発生する危険もあります。</p>
                        <p>焚き火をそのまま放置してその場を離れてしまったり、炭を適切な場所に廃棄しなかったためにボヤが起きてしまうと、キャンプ場にとって大きな問題となります。</p>
                        <p>きちんと火の元の処理をするまでが焚き火です。</p>
                        <p>火災に関しては一生、取り返しのつかない事態になりかねませんので細心の注意が必要です。</p>
                    </div>
                </div>
                <div className="mt-16 text-[#543310] font-semibold">
                    <div className="flex h-[60px] items-center gap-2">
                        <FaTree className="text-3xl"/>
                        <p className="mt-[6px] text-[24px]">自然を守るのが第一！これからもキャンプができる場所に</p>
                    </div>
                    <div className="mt-6 ml-4 flex flex-col gap-2">
                        <p>当然ながら、キャンプは自然の中で楽しむ行為です。</p>
                        <p>むしろ、こちらは自然の場所を借りている立場なので自然を優先して、破壊するなんてことはあってはなりません。</p>
                        <p>お子さんがいると、普段とは違う珍しい環境でテンションが上がって草木を破壊してしまうということもあるかもしれません。しかし、それがどうしていけないのかということを教えるのにもキャンプはとても良い機会でしょう。</p>
                        <p>大人だけのキャンプでも、草の上で直接焚き火をしてしまったりすることで自然破壊に繋がるケースが相次いでいます。</p>
                        <p>非日常の空間だからこそ、正しい知識を身につけ、その場所に敬意を持って過ごすようにしましょう。</p>
                    </div>
                </div>
                <div className="mt-20 w-full">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-center items-center text-[#543310] font-bold gap-2">
                            <TbCampfireFilled className="text-4xl"/>
                            <h1 className="text-[28px] mt-[6px]">山火事を防ぐポイント</h1>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-[#543310]"></p>
                            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[#543310]"></hr>
                            <p className="text-gray-500 dark:text-[#543310]"></p>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="w-[600px] rounded-md overflow-hidden">
                            <img 
                                src="/pic/kajifusegu.jpg" 
                                alt="Kajifusegu"
                                className="w-full h-[337.5px]"  
                            />
                        </div>
                        <div className="w-[600px] h-[337.5px] overflow-hidden rounded-md">
                            <iframe width="600" height="337.5" src="https://www.youtube.com/embed/6m-MwnF73Hc" title="キャンプブッシュクラフトの山火事対策　安全な焚火のやり方" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}