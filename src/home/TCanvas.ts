import * as THREE from 'three'
import { TCanvasBase } from '../scripts/TCanvasBase'
import { assets } from './datas'

export class TCanvas extends TCanvasBase {
	private imageGroup = new THREE.Group()
	private mouseTarget = new THREE.Vector2()

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.loadAssets(assets).then(async () => {
			this.setScene()
			this.createModel()
			this.animate(this.update)
			// this.animate()
			this.addEvent()
		})
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#005')
		this.camera.position.z = 3
		this.camera.userData.position = this.camera.position.clone()
		// helpers
		// this.setOrbitControls()
		// this.setAxesHelper()
	}

	private addEvent = () => {
		window.addEventListener('mousemove', this.handleMousemove)
	}

	private handleMousemove = (e: MouseEvent) => {
		const { width, height } = this.size
		const x = (e.clientX / width) * 2 - 1
		const y = -(e.clientY / height) * 2 + 1
		this.mouseTarget.set(x, y)
	}

	private createModel = () => {
		const textures = {
			sky: assets.sky.data as THREE.Texture,
			mountain: assets.mountain.data as THREE.Texture,
			forest: assets.forest.data as THREE.Texture,
			grass: assets.grass.data as THREE.Texture,
			house3: assets.house3.data as THREE.Texture,
			tree: assets.tree.data as THREE.Texture,
			flowers: assets.flowers.data as THREE.Texture,
			butterflies: assets.butterflies.data as THREE.Texture,
			smoke: assets.smoke.data as THREE.VideoTexture,
			moveButterflies: assets.moveButterflies.data as THREE.VideoTexture
		}

		const createMesh = (texture: THREE.Texture | THREE.VideoTexture, scale = 1, useAlphaMap = false, opacity = 1) => {
			const aspect = texture instanceof THREE.VideoTexture ? 16 / 9 : texture.userData.aspect
			const geometry = new THREE.PlaneGeometry(aspect * scale, scale)
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				alphaMap: useAlphaMap ? texture : undefined,
				opacity,
				depthWrite: false
			})
			return new THREE.Mesh(geometry, material)
		}

		const sky = createMesh(textures.sky, 3)
		sky.position.set(0, 0.75, 0)

		const mountain = createMesh(textures.mountain, 0.6)
		mountain.position.set(0, 0, 0.1)

		const forest = createMesh(textures.forest, 0.3)
		forest.position.set(0, -0.15, 0.2)

		const grass = createMesh(textures.grass, 0.8)
		grass.position.set(0, -0.55, 0.3)

		const tree = createMesh(textures.tree, 0.8)
		tree.position.set(0.2, -0.12, 0.4)

		const house3 = createMesh(textures.house3, 1)
		house3.position.set(0.6, -0.15, 0.5)

		const flowers = createMesh(textures.flowers, 0.7)
		flowers.position.set(0, -0.6, 0.6)

		const butterflies = createMesh(textures.butterflies, 0.2)
		butterflies.position.set(0.6, -0.5, 0.7)

		// video mesh
		const smoke = createMesh(textures.smoke, 0.8, true, 0.8)
		smoke.position.set(0.21, 0.86, -0.02)
		house3.add(smoke)

		const moveButterflies = createMesh(textures.moveButterflies, 0.5, true)
		moveButterflies.position.set(0.8, 0.1, 0.02)
		flowers.add(moveButterflies)

		this.imageGroup.add(sky, mountain, forest, grass, tree, house3, flowers, butterflies)
		const imageGroupScale = 1.8
		this.imageGroup.scale.set(imageGroupScale, imageGroupScale, 1)
		// this.imageGroup.position.z = -0.35

		this.scene.add(this.imageGroup)
	}

	private update = () => {
		const targetX = this.camera.userData.position.x + this.mouseTarget.x * 0.08
		const targetY = this.camera.userData.position.y + this.mouseTarget.y * 0.05
		this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetX, 0.1)
		this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 0.1)

		this.camera.lookAt(0, 0, 0)
	}
}
