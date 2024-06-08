export default function Loading() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <video width={100} src="/videos/rin_shima_loading.mp4" loop={true} autoPlay={true}></video>
        </div>
    )
}