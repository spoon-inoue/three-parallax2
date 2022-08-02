import { Assets } from '../scripts/TCanvasBase'
import { publicPath } from '../scripts/utils'

const resolvePath = (fileName: string) => publicPath(`/assets/${fileName}`)

export const assets: Assets = {
	butterflies: { path: resolvePath('butterflies.png'), encoding: true },
	flowers: { path: resolvePath('flowers.png') },
	forest: { path: resolvePath('forest.png'), encoding: true },
	grass: { path: resolvePath('grass.png'), encoding: true },
	house3: { path: resolvePath('house3.png'), encoding: true },
	mountain: { path: resolvePath('mountain.png'), encoding: true },
	tree: { path: resolvePath('tree.png'), encoding: true },
	// sky
	sky: { path: resolvePath('sky_without_clouds.jpg'), encoding: true },
	cloud1: { path: resolvePath('clouds/cloud_01.png') },
	cloud2: { path: resolvePath('clouds/cloud_02.png') },
	cloud3: { path: resolvePath('clouds/cloud_03.png') },
	cloud4: { path: resolvePath('clouds/cloud_04.png') },
	cloud5: { path: resolvePath('clouds/cloud_05.png') },
	cloud6: { path: resolvePath('clouds/cloud_06.png') },
	// movie
	// smoke: { path: resolvePath('smoke.webm') },
	smoke: { path: resolvePath('smoke.mp4') },
	moveButterflies: { path: resolvePath('butterflies.webm'), encoding: true }
}
