<template>
  <div class="file-browser-overlay" v-if="isOpen" @click="closeModal">
    <div class="file-browser-modal" @click.stop>
      <div class="file-browser-header">
        <h3>File Manager</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="file-browser-toolbar">
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileUpload" 
          accept="image/*" 
          style="display: none"
        />
        <button class="upload-btn" @click="$refs.fileInput.click()">
          📤 Upload Image
        </button>
        <button class="refresh-btn" @click="loadFiles">
          🔄 Refresh
        </button>
      </div>

      <div class="file-browser-content">
        <div v-if="loading" class="loading">Loading files...</div>
        
        <div v-else-if="files.length === 0" class="no-files">
          No files uploaded yet. Upload your first image!
        </div>
        
        <div v-else class="files-grid">
          <div 
            v-for="file in files" 
            :key="file.name" 
            class="file-item"
            @click="selectFile(file)"
            :class="{ selected: selectedFile?.name === file.name }"
          >
            <div class="file-preview">
              <img :src="file.url" :alt="file.name" loading="lazy" />
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
            </div>
            <button 
              class="delete-btn" 
              @click.stop="deleteFile(file)"
              title="Delete file"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div class="file-browser-footer">
        <div class="selected-info" v-if="selectedFile">
          Selected: {{ selectedFile.name }}
        </div>
        <div class="buttons">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button 
            class="btn-select" 
            @click="confirmSelection" 
            :disabled="!selectedFile"
          >
            Select File
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'select'])

const files = ref([])
const loading = ref(false)
const selectedFile = ref(null)
const fileInput = ref(null)

const loadFiles = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/api/files')
    const data = await response.json()
    files.value = data.files || []
  } catch (error) {
    console.error('Error loading files:', error)
    alert('Failed to load files. Make sure the server is running.')
  } finally {
    loading.value = false
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (result.location) {
      await loadFiles() // Refresh file list
      alert('File uploaded successfully!')
    } else {
      alert('Upload failed: ' + (result.error || 'Unknown error'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    alert('Upload failed: ' + error.message)
  }
  
  // Clear input
  event.target.value = ''
}

const selectFile = (file) => {
  selectedFile.value = file
}

const deleteFile = async (file) => {
  if (!confirm(`Are you sure you want to delete ${file.name}?`)) return
  
  try {
    const response = await fetch(`http://localhost:3001/api/files/${file.name}`, {
      method: 'DELETE'
    })
    
    if (response.ok) {
      await loadFiles()
      if (selectedFile.value?.name === file.name) {
        selectedFile.value = null
      }
    } else {
      alert('Failed to delete file')
    }
  } catch (error) {
    console.error('Delete error:', error)
    alert('Failed to delete file: ' + error.message)
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const closeModal = () => {
  selectedFile.value = null
  emit('close')
}

const confirmSelection = () => {
  if (selectedFile.value) {
    emit('select', selectedFile.value)
    closeModal()
  }
}

onMounted(() => {
  if (props.isOpen) {
    loadFiles()
  }
})

// Watch for open state changes
import { watch } from 'vue'
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    loadFiles()
  }
})
</script>

<style scoped>
.file-browser-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.file-browser-modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.file-browser-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-browser-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-browser-toolbar {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 1rem;
}

.upload-btn, .refresh-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-btn:hover, .refresh-btn:hover {
  background: #e9ecef;
}

.file-browser-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.loading, .no-files {
  text-align: center;
  color: #6c757d;
  padding: 2rem;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.file-item {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.file-item:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.file-item.selected {
  border-color: #007bff;
  background-color: #f8f9ff;
}

.file-preview {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  text-align: center;
}

.file-name {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 0.7rem;
  color: #6c757d;
}

.delete-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.delete-btn:hover {
  opacity: 1;
  background: rgba(255, 0, 0, 0.1);
}

.file-browser-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-info {
  font-size: 0.9rem;
  color: #6c757d;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-cancel, .btn-select {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-select {
  background: #007bff;
  color: white;
}

.btn-select:hover:not(:disabled) {
  background: #0056b3;
}

.btn-select:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>