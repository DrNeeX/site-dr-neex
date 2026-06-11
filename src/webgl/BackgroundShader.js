import * as THREE from 'three';

export class BackgroundShader {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const geometry = new THREE.PlaneGeometry(2, 2);

        this.uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_mouse: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            varying vec2 vUv;

            // Simplex noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                st.x *= u_resolution.x / u_resolution.y;

                // Subtle fluid animation
                vec2 pos = vec2(st * 1.5);
                
                // Add mouse influence subtly
                vec2 mouseNorm = u_mouse / u_resolution;
                float dist = distance(st, vec2(mouseNorm.x * (u_resolution.x/u_resolution.y), 1.0 - mouseNorm.y));
                pos -= mouseNorm * 0.1 * smoothstep(1.0, 0.0, dist);

                float n = snoise(pos + u_time * 0.1);
                float n2 = snoise(pos * 2.0 - u_time * 0.05);
                
                float combined = (n + n2) * 0.5;

                // Very dark, subtle gradient (DR Concept signature: cyan to deep blue/purple)
                vec3 color1 = vec3(0.02, 0.02, 0.04); // Deep dark background
                vec3 color2 = vec3(0.0, 0.08, 0.15); // Subtle dark cyan/blue
                
                // Highlight where mouse is
                vec3 highlight = vec3(0.0, 0.2, 0.3) * smoothstep(1.5, 0.0, dist) * 0.25;

                vec3 finalColor = mix(color1, color2, combined + 0.5) + highlight;

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: this.uniforms,
            depthWrite: false,
            depthTest: false
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);
        this.clock = new THREE.Clock();
    }

    onPointerMove(event) {
        this.uniforms.u_mouse.value.x = event.clientX;
        this.uniforms.u_mouse.value.y = event.clientY;
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.uniforms.u_resolution.value.x = window.innerWidth;
        this.uniforms.u_resolution.value.y = window.innerHeight;
    }

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('pointermove', this.onPointerMove.bind(this));
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Culling optimization
        if (window.scrollY > window.innerHeight * 1.5) {
            return;
        }

        this.uniforms.u_time.value = this.clock.getElapsedTime();
        this.renderer.render(this.scene, this.camera);
    }
}
