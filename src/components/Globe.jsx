import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

export default function Globe() {
    const canvasRef = useRef()

    useEffect(() => {
        let phi = 0

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            scale: 0.8,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // Oxford coordinates
                { location: [51.7520, -1.2577], size: 0.1 }
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi
                phi += 0.003
            },
        })

        return () => {
            globe.destroy()
        }
    }, [])

    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen">
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
                className="w-full h-full opacity-90 transition-opacity duration-1000 ease-in-out"
            />
        </div>
    )
}
