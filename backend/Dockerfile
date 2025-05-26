# Gunakan image Node.js ringan
FROM node:20-alpine

# Tentukan direktori kerja
WORKDIR /app

# Copy file dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy semua file proyek
COPY . .

# Buka port 5000 (meskipun Cloud Run override ini, tetap baik untuk dokumentasi)
EXPOSE 4001

# Jalankan aplikasi
CMD ["node", "index.js"]
