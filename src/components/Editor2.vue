<template>
  <div class="editor-container">
    <h2>TinyMCE Editor 2</h2>
    <p>This editor uses TinyMCE files from /vendor/tinymce2/</p>
    <editor
        :init="editorConfig"
        tinymce-script-src="/vendor/tinymce2/tinymce.min.js"
        v-model="form.about_text"
        license_key="gpl"
     ></editor>
     
    <FileBrowser 
      :is-open="showFileBrowser" 
      @close="showFileBrowser = false"
      @select="handleFileSelect"
    />
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Editor from '@tinymce/tinymce-vue';
    import FileBrowser from './FileBrowser.vue';

    const form = ref({ about_text: '' });
    const showFileBrowser = ref(false);
    let currentFilePickerCallback = null;

    const mentionUsers = ref([
      { id: 'john.doe', name: 'John Doe' },
      { id: 'jane.smith', name: 'Jane Smith' },
      { id: 'peter.jones', name: 'Peter Jones' }
    ]);

    const handleFileSelect = (file) => {
      if (currentFilePickerCallback) {
        currentFilePickerCallback(file.url, {
          title: file.name,
          alt: file.name
        });
        currentFilePickerCallback = null;
      }
    };

    // Make functions available globally for TinyMCE
    window.editor2_openFileBrowser = () => {
      showFileBrowser.value = true;
    };

    window.editor2_setCallback = (callback) => {
      currentFilePickerCallback = callback;
    };

    const editorConfig = {
       plugins: 'emoticons table advlist codesample autosave autoresize lists link image textcolor media contextmenu paste mention',
       menubar: true,
       branding: false,
       toolbar: 'undo redo | fontsizeselect formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | link image media | table | emoticons | codesample',
       table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
       table_appearance_options: false,
       table_grid: true,
       table_class_list: [
         {title: 'None', value: ''},
         {title: 'Table with borders', value: 'table-bordered'},
         {title: 'Striped table', value: 'table-striped'}
       ],
       emoticons_database_url: '/vendor/tinymce2/plugins/emoticons/js/emojis.min.js',
       codesample_languages: [
         {name: 'HTML/XML', id: 'markup'},
         {text: 'JavaScript', value: 'javascript'},
         {text: 'CSS', value: 'css'},
         {text: 'PHP', value: 'php'},
         {text: 'Ruby', value: 'ruby'},
         {text: 'Python', value: 'python'},
         {text: 'Java', value: 'java'},
         {text: 'C', value: 'c'},
         {text: 'C#', value: 'csharp'},
         {text: 'C++', value: 'cpp'}
       ],
       paste_data_images: true,
       paste_as_text: false,
       paste_webkit_styles: 'all',
       paste_retain_style_properties: 'all',

       // File upload configuration
       automatic_uploads: true,
       file_picker_types: 'image',
       images_upload_handler: function (blobInfo, success, failure) {
         const formData = new FormData();
         formData.append('file', blobInfo.blob(), blobInfo.filename());

         fetch('http://localhost:3001/api/upload', {
           method: 'POST',
           body: formData
         })
         .then(response => response.json())
         .then(result => {
           if (result.location) {
             success(result.location);
           } else {
             failure(result.error || 'Upload failed');
           }
         })
         .catch(error => {
           console.error('Upload error:', error);
           failure('Network error: ' + error.message);
         });
       },

       // File picker for image dialog
       file_picker_callback: function (callback, meta) {
         if (meta.filetype === 'image') {
           window.editor2_setCallback(callback);
           window.editor2_openFileBrowser();
         }
       },

       mentions: {
         source: (query, successCallback) => {
           const filteredUsers = mentionUsers.value.filter(user =>
             user.name.toLowerCase().includes(query.toLowerCase())
           );
           successCallback(filteredUsers);
         },
         insert: (user) => {
           return `&nbsp;<strong contenteditable="false">@${user.name}</strong>&nbsp;`;
         }
       }
    }
</script>

<style scoped>
.editor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.editor-container h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.editor-container p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-style: italic;
}
</style>