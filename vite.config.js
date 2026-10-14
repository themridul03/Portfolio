import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const copyProfilePlugin = () => ({
  name: 'copy-profile-image',
  buildStart() {
    const src = 'C:/Users/Mridu/.gemini/antigravity/brain/0803d3bc-efaf-44b5-a39b-6a524d1dc22a/.user_uploaded/media_1791974769433_ace254dd.png';
    const destPublic = path.resolve(__dirname, 'public/mridul.png');
    const destSrc = path.resolve(__dirname, 'src/assets/mridul.png');
    if (fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, destPublic);
        fs.copyFileSync(src, destSrc);
        console.log('✅ Successfully synced profile photo to public/mridul.png and src/assets/mridul.png');
      } catch (e) {
        console.error('Failed to copy profile photo:', e);
      }
    }
  },
  configureServer(server) {
    const src = 'C:/Users/Mridu/.gemini/antigravity/brain/0803d3bc-efaf-44b5-a39b-6a524d1dc22a/.user_uploaded/media_1791974769433_ace254dd.png';
    const destPublic = path.resolve(__dirname, 'public/mridul.png');
    const destSrc = path.resolve(__dirname, 'src/assets/mridul.png');
    if (fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, destPublic);
        fs.copyFileSync(src, destSrc);
        console.log('✅ Server started: synced profile photo');
      } catch (e) {
        console.error('Server sync error:', e);
      }
    }
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyProfilePlugin()],
  resolve: {
    alias: {
      '@profile': 'C:/Users/Mridu/.gemini/antigravity/brain/0803d3bc-efaf-44b5-a39b-6a524d1dc22a/.user_uploaded/media_1791974769433_ace254dd.png',
      '@developer3d': 'C:/Users/Mridu/.gemini/antigravity/brain/0803d3bc-efaf-44b5-a39b-6a524d1dc22a/developer_3d_portrait_1791977382168.jpg',
      '@karto3d': 'C:/Users/Mridu/.gemini/antigravity/brain/0803d3bc-efaf-44b5-a39b-6a524d1dc22a/karto_isometric_delivery_ecosystem_1791977420773.jpg',
    }
  },
  server: {
    fs: {
      allow: ['..', 'C:/Users/Mridu']
    }
  }
})

