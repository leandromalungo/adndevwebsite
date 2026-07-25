"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import React, { Component, ErrorInfo, ReactNode } from "react";

// Fallback visual para browsers sem suporte WebGL
const FallbackBackground = () => (
    <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #00006b 0%, #442aad 50%, #47f9ff 100%)",
            pointerEvents: "none",
        }}
    />
);

// Componente ShaderGradient que sempre anima
const ShaderGradientComponent = () => {
    const [ShaderGradient, setShaderGradient] = useState<any>(null);
    const [ShaderGradientCanvas, setShaderGradientCanvas] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadShader = async () => {
            const mod = await import("@shadergradient/react");
            if (!isMounted) return;

            setShaderGradient(() => mod.ShaderGradient);
            setShaderGradientCanvas(() => mod.ShaderGradientCanvas);
            setIsLoaded(true);
        };

        loadShader();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const updateViewport = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);

        return () => {
            window.removeEventListener("resize", updateViewport);
        };
    }, []);

    const shaderConfig = useMemo(
        () => ({
            animate: "on" as const,
            axesHelper: "off" as const,
            brightness: 1.2,
            cAzimuthAngle: 170,
            cDistance: 4.4,
            cPolarAngle: 70,
            cameraZoom: 1,
            color1: "#47f9ff",
            color2: "#442aad",
            color3: "#00006b",
            destination: "onCanvas" as const,
            embedMode: "off" as const,
            envPreset: "city" as const,
            fov: 45,
            frameRate: isMobile ? 3 : 5,
            gizmoHelper: "hide" as const,
            grain: "off" as const,
            lightType: "3d" as const,
            pixelDensity: isMobile ? 0.5 : 0.7,
            positionX: 0,
            positionY: 0.9,
            positionZ: -0.3,
            range: "disabled" as const,
            rangeEnd: 40,
            rangeStart: 0,
            reflection: 0.1,
            rotationX: 45,
            rotationY: 0,
            rotationZ: 0,
            shader: "defaults" as const,
            type: "waterPlane" as const,
            uAmplitude: 0,
            uDensity: 1,
            uFrequency: 0,
            uSpeed: 0.2,
            uStrength: 3.6,
            uTime: 0,
            wireframe: false,
        }),
        [isMobile]
    );

    return (
        <>
            {!isLoaded && <FallbackBackground />}

            {ShaderGradient && ShaderGradientCanvas ? (
                <ShaderGradientCanvas
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        willChange: "transform",
                    }}
                >
                    <ShaderGradient {...shaderConfig} />
                </ShaderGradientCanvas>
            ) : null}
        </>
    );
};

// Error Boundary para evitar crash no React se WebGL falhar na inicialização
class ShaderErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
    constructor(props: {children: ReactNode}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.warn("ShaderGradient não pôde ser iniciado. A exibir fallback estático CSS.", error.message);
    }

    render() {
        if (this.state.hasError) {
            return <FallbackBackground />;
        }
        return this.props.children;
    }
}

export default function GradientBackground() {
    // Referência ao container
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                contain: "layout paint size",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
            }}
        >
            <ShaderErrorBoundary>
                <ShaderGradientComponent />
            </ShaderErrorBoundary>
        </div>
    );
}
