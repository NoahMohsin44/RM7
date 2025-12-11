export default function GridBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Radial gradient centered container */}
            {/* Solid bg removed to rely on App bg */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:10%_100%] md:bg-[size:120px_100%]" />
            {/* Fade out edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        </div>
    )
}
