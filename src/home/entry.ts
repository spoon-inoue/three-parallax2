import { assets } from './datas'
import { TCanvas } from './TCanvas'

class App {
	private canvas: TCanvas

	constructor() {
		const parentNode = document.querySelector('body')!
		this.canvas = new TCanvas(parentNode)
		this.addEvents()
	}

	private addEvents = () => {
		const playButton = document.querySelector<HTMLButtonElement>('.home-button')!
		playButton.onclick = () => {
			if (assets.smoke.data) {
				const smoke = (assets.smoke.data as any).source.data as HTMLVideoElement
				const moveButterflies = (assets.moveButterflies.data as any).source.data as HTMLVideoElement
				smoke.play()
				moveButterflies.play()

				playButton.classList.add('disable')
			}
		}
		playButton.ontransitionend = () => {
			playButton.hidden = true
		}

		window.onbeforeunload = () => {
			this.dispose()
		}
	}

	private dispose = () => {
		this.canvas.dispose()
	}
}

new App()
