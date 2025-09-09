
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Weather theme colors
				sunny: {
					primary: 'hsl(var(--sunny-primary))',
					secondary: 'hsl(var(--sunny-secondary))',
					accent: 'hsl(var(--sunny-accent))'
				},
				rainy: {
					primary: 'hsl(var(--rainy-primary))',
					secondary: 'hsl(var(--rainy-secondary))',
					accent: 'hsl(var(--rainy-accent))'
				},
				cloudy: {
					primary: 'hsl(var(--cloudy-primary))',
					secondary: 'hsl(var(--cloudy-secondary))',
					accent: 'hsl(var(--cloudy-accent))'
				},
				snowy: {
					primary: 'hsl(var(--snowy-primary))',
					secondary: 'hsl(var(--snowy-secondary))',
					accent: 'hsl(var(--snowy-accent))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				floating: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'rain-fall': {
					'0%': { transform: 'translateY(-100vh) rotateZ(-10deg)' },
					'100%': { transform: 'translateY(100vh) rotateZ(-10deg)' }
				},
				'snow-fall': {
					'0%': { transform: 'translateY(-100vh) rotateZ(0deg)' },
					'100%': { transform: 'translateY(100vh) rotateZ(360deg)' }
				},
				'cloud-drift': {
					'0%, 100%': { transform: 'translateX(0px)' },
					'50%': { transform: 'translateX(30px)' }
				},
				'sun-rotation': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				floating: 'floating 3s ease-in-out infinite',
				'rain-fall': 'rain-fall 1s linear infinite',
				'snow-fall': 'snow-fall 3s linear infinite',
				'cloud-drift': 'cloud-drift 20s ease-in-out infinite',
				'sun-rotation': 'sun-rotation 20s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
