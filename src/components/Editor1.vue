<template>
  <div class="editor-container">
    <h2>TinyMCE Editor with Manual Full Emoji Configuration</h2>
    <p>This editor manually loads a complete emoji database</p>
    <editor
        :init="editorConfig"
        tinymce-script-src="/vendor/tinymce/tinymce.min.js"
        v-model="form.about_text"
     ></editor>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Editor from '@tinymce/tinymce-vue';

    const form = ref({ about_text: '' });

    const mentionUsers = ref([
      { id: 'john.doe', name: 'John Doe' },
      { id: 'jane.smith', name: 'Jane Smith' },
      { id: 'peter.jones', name: 'Peter Jones' }
    ]);

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
       
       // Use CDN for full emoji database
       emoticons_database_url: '/vendor/tinymce/plugins/emoticons/plugin.min.js',
       emoticons_database_id: 'emojis',
       
       // Alternative: Define custom comprehensive emoji set
       emoticons_append: {
         'smileys_people': {
           title: 'Smileys & People',
           items: [
             { keywords: ['grinning'], char: '😀' },
             { keywords: ['grin'], char: '😁' },
             { keywords: ['joy'], char: '😂' },
             { keywords: ['smiley'], char: '😃' },
             { keywords: ['smile'], char: '😄' },
             { keywords: ['sweat_smile'], char: '😅' },
             { keywords: ['laughing'], char: '😆' },
             { keywords: ['innocent'], char: '😇' },
             { keywords: ['wink'], char: '😉' },
             { keywords: ['blush'], char: '😊' },
             { keywords: ['yum'], char: '😋' },
             { keywords: ['relieved'], char: '😌' },
             { keywords: ['heart_eyes'], char: '😍' },
             { keywords: ['sunglasses'], char: '😎' },
             { keywords: ['smirk'], char: '😏' },
             { keywords: ['neutral_face'], char: '😐' },
             { keywords: ['expressionless'], char: '😑' },
             { keywords: ['unamused'], char: '😒' },
             { keywords: ['sweat'], char: '😓' },
             { keywords: ['pensive'], char: '😔' },
             { keywords: ['confused'], char: '😕' },
             { keywords: ['confounded'], char: '😖' },
             { keywords: ['kissing'], char: '😗' },
             { keywords: ['kissing_heart'], char: '😘' },
             { keywords: ['kissing_smiling_eyes'], char: '😙' },
             { keywords: ['kissing_closed_eyes'], char: '😚' },
             { keywords: ['stuck_out_tongue'], char: '😛' },
             { keywords: ['stuck_out_tongue_winking_eye'], char: '😜' },
             { keywords: ['stuck_out_tongue_closed_eyes'], char: '😝' },
             { keywords: ['disappointed'], char: '😞' },
             { keywords: ['worried'], char: '😟' },
             { keywords: ['angry'], char: '😠' },
             { keywords: ['rage'], char: '😡' },
             { keywords: ['cry'], char: '😢' },
             { keywords: ['persevere'], char: '😣' },
             { keywords: ['triumph'], char: '😤' },
             { keywords: ['disappointed_relieved'], char: '😥' },
             { keywords: ['frowning'], char: '😦' },
             { keywords: ['anguished'], char: '😧' },
             { keywords: ['fearful'], char: '😨' },
             { keywords: ['weary'], char: '😩' },
             { keywords: ['sleepy'], char: '😪' },
             { keywords: ['tired_face'], char: '😫' },
             { keywords: ['grimacing'], char: '😬' },
             { keywords: ['sob'], char: '😭' },
             { keywords: ['open_mouth'], char: '😮' },
             { keywords: ['hushed'], char: '😯' },
             { keywords: ['cold_sweat'], char: '😰' },
             { keywords: ['scream'], char: '😱' },
             { keywords: ['astonished'], char: '😲' },
             { keywords: ['flushed'], char: '😳' },
             { keywords: ['sleeping'], char: '😴' },
             { keywords: ['dizzy_face'], char: '😵' },
             { keywords: ['no_mouth'], char: '😶' },
             { keywords: ['mask'], char: '😷' }
           ]
         },
         'animals_nature': {
           title: 'Animals & Nature',
           items: [
             { keywords: ['monkey_face'], char: '🐵' },
             { keywords: ['monkey'], char: '🐒' },
             { keywords: ['dog'], char: '🐶' },
             { keywords: ['dog2'], char: '🐕' },
             { keywords: ['poodle'], char: '🐩' },
             { keywords: ['wolf'], char: '🐺' },
             { keywords: ['cat'], char: '🐱' },
             { keywords: ['cat2'], char: '🐈' },
             { keywords: ['lion'], char: '🦁' },
             { keywords: ['tiger'], char: '🐯' },
             { keywords: ['tiger2'], char: '🐅' },
             { keywords: ['leopard'], char: '🐆' },
             { keywords: ['horse'], char: '🐴' },
             { keywords: ['racehorse'], char: '🐎' },
             { keywords: ['unicorn'], char: '🦄' },
             { keywords: ['deer'], char: '🦌' },
             { keywords: ['cow'], char: '🐮' },
             { keywords: ['ox'], char: '🐂' },
             { keywords: ['water_buffalo'], char: '🐃' },
             { keywords: ['cow2'], char: '🐄' },
             { keywords: ['pig'], char: '🐷' },
             { keywords: ['pig2'], char: '🐖' },
             { keywords: ['boar'], char: '🐗' },
             { keywords: ['pig_nose'], char: '🐽' },
             { keywords: ['ram'], char: '🐏' },
             { keywords: ['sheep'], char: '🐑' },
             { keywords: ['goat'], char: '🐐' },
             { keywords: ['dromedary_camel'], char: '🐪' },
             { keywords: ['camel'], char: '🐫' },
             { keywords: ['elephant'], char: '🐘' },
             { keywords: ['rhinoceros'], char: '🦏' },
             { keywords: ['mouse'], char: '🐭' },
             { keywords: ['mouse2'], char: '🐁' },
             { keywords: ['rat'], char: '🐀' },
             { keywords: ['hamster'], char: '🐹' },
             { keywords: ['rabbit'], char: '🐰' },
             { keywords: ['rabbit2'], char: '🐇' }
           ]
         },
         'food_drink': {
           title: 'Food & Drink',
           items: [
             { keywords: ['grapes'], char: '🍇' },
             { keywords: ['melon'], char: '🍈' },
             { keywords: ['watermelon'], char: '🍉' },
             { keywords: ['mandarin'], char: '🍊' },
             { keywords: ['lemon'], char: '🍋' },
             { keywords: ['banana'], char: '🍌' },
             { keywords: ['pineapple'], char: '🍍' },
             { keywords: ['apple'], char: '🍎' },
             { keywords: ['green_apple'], char: '🍏' },
             { keywords: ['pear'], char: '🍐' },
             { keywords: ['peach'], char: '🍑' },
             { keywords: ['cherries'], char: '🍒' },
             { keywords: ['strawberry'], char: '🍓' },
             { keywords: ['tomato'], char: '🍅' },
             { keywords: ['eggplant'], char: '🍆' },
             { keywords: ['corn'], char: '🌽' },
             { keywords: ['hot_pepper'], char: '🌶️' },
             { keywords: ['cucumber'], char: '🥒' },
             { keywords: ['broccoli'], char: '🥦' },
             { keywords: ['mushroom'], char: '🍄' },
             { keywords: ['peanuts'], char: '🥜' },
             { keywords: ['chestnut'], char: '🌰' },
             { keywords: ['bread'], char: '🍞' },
             { keywords: ['croissant'], char: '🥐' },
             { keywords: ['baguette'], char: '🥖' },
             { keywords: ['pancakes'], char: '🥞' },
             { keywords: ['cheese'], char: '🧀' },
             { keywords: ['meat_on_bone'], char: '🍖' },
             { keywords: ['poultry_leg'], char: '🍗' },
             { keywords: ['bacon'], char: '🥓' },
             { keywords: ['hamburger'], char: '🍔' },
             { keywords: ['fries'], char: '🍟' },
             { keywords: ['pizza'], char: '🍕' },
             { keywords: ['hotdog'], char: '🌭' },
             { keywords: ['taco'], char: '🌮' },
             { keywords: ['burrito'], char: '🌯' }
           ]
         },
         'activities': {
           title: 'Activities',
           items: [
             { keywords: ['soccer'], char: '⚽' },
             { keywords: ['basketball'], char: '🏀' },
             { keywords: ['football'], char: '🏈' },
             { keywords: ['baseball'], char: '⚾' },
             { keywords: ['tennis'], char: '🎾' },
             { keywords: ['volleyball'], char: '🏐' },
             { keywords: ['rugby_football'], char: '🏉' },
             { keywords: ['8ball'], char: '🎱' },
             { keywords: ['golf'], char: '⛳' },
             { keywords: ['golfing_woman'], char: '🏌️‍♀️' },
             { keywords: ['golfing_man'], char: '🏌️‍♂️' },
             { keywords: ['ping_pong'], char: '🏓' },
             { keywords: ['badminton'], char: '🏸' },
             { keywords: ['goal_net'], char: '🥅' },
             { keywords: ['ice_hockey'], char: '🏒' },
             { keywords: ['field_hockey'], char: '🏑' },
             { keywords: ['cricket'], char: '🏏' },
             { keywords: ['ski'], char: '🎿' },
             { keywords: ['skier'], char: '⛷️' },
             { keywords: ['snowboarder'], char: '🏂' },
             { keywords: ['person_fencing'], char: '🤺' },
             { keywords: ['wrestling'], char: '🤼' },
             { keywords: ['boxing_glove'], char: '🥊' },
             { keywords: ['martial_arts_uniform'], char: '🥋' }
           ]
         },
         'travel_places': {
           title: 'Travel & Places',
           items: [
             { keywords: ['car'], char: '🚗' },
             { keywords: ['taxi'], char: '🚕' },
             { keywords: ['blue_car'], char: '🚙' },
             { keywords: ['bus'], char: '🚌' },
             { keywords: ['trolleybus'], char: '🚎' },
             { keywords: ['racing_car'], char: '🏎️' },
             { keywords: ['police_car'], char: '🚓' },
             { keywords: ['ambulance'], char: '🚑' },
             { keywords: ['fire_engine'], char: '🚒' },
             { keywords: ['minibus'], char: '🚐' },
             { keywords: ['truck'], char: '🚚' },
             { keywords: ['articulated_lorry'], char: '🚛' },
             { keywords: ['tractor'], char: '🚜' },
             { keywords: ['kick_scooter'], char: '🛴' },
             { keywords: ['bike'], char: '🚲' },
             { keywords: ['motor_scooter'], char: '🛵' },
             { keywords: ['motorcycle'], char: '🏍️' },
             { keywords: ['rotating_light'], char: '🚨' },
             { keywords: ['oncoming_police_car'], char: '🚔' },
             { keywords: ['oncoming_bus'], char: '🚍' },
             { keywords: ['oncoming_automobile'], char: '🚘' },
             { keywords: ['oncoming_taxi'], char: '🚖' },
             { keywords: ['aerial_tramway'], char: '🚡' },
             { keywords: ['mountain_cableway'], char: '🚠' },
             { keywords: ['suspension_railway'], char: '🚟' },
             { keywords: ['railway_car'], char: '🚃' },
             { keywords: ['train'], char: '🚋' },
             { keywords: ['monorail'], char: '🚝' },
             { keywords: ['bullettrain_side'], char: '🚄' },
             { keywords: ['bullettrain_front'], char: '🚅' }
           ]
         },
         'objects': {
           title: 'Objects',
           items: [
             { keywords: ['watch'], char: '⌚' },
             { keywords: ['iphone'], char: '📱' },
             { keywords: ['calling'], char: '📲' },
             { keywords: ['computer'], char: '💻' },
             { keywords: ['keyboard'], char: '⌨️' },
             { keywords: ['desktop_computer'], char: '🖥️' },
             { keywords: ['printer'], char: '🖨️' },
             { keywords: ['computer_mouse'], char: '🖱️' },
             { keywords: ['trackball'], char: '🖲️' },
             { keywords: ['joystick'], char: '🕹️' },
             { keywords: ['clamp'], char: '🗜️' },
             { keywords: ['minidisc'], char: '💽' },
             { keywords: ['floppy_disk'], char: '💾' },
             { keywords: ['cd'], char: '💿' },
             { keywords: ['dvd'], char: '📀' },
             { keywords: ['vhs'], char: '📼' },
             { keywords: ['camera'], char: '📷' },
             { keywords: ['camera_flash'], char: '📸' },
             { keywords: ['video_camera'], char: '📹' },
             { keywords: ['movie_camera'], char: '🎥' },
             { keywords: ['film_projector'], char: '📽️' },
             { keywords: ['film_strip'], char: '🎞️' },
             { keywords: ['telephone_receiver'], char: '📞' },
             { keywords: ['phone'], char: '☎️' },
             { keywords: ['pager'], char: '📟' },
             { keywords: ['fax'], char: '📠' }
           ]
         },
         'symbols': {
           title: 'Symbols',
           items: [
             { keywords: ['heart'], char: '❤️' },
             { keywords: ['orange_heart'], char: '🧡' },
             { keywords: ['yellow_heart'], char: '💛' },
             { keywords: ['green_heart'], char: '💚' },
             { keywords: ['blue_heart'], char: '💙' },
             { keywords: ['purple_heart'], char: '💜' },
             { keywords: ['black_heart'], char: '🖤' },
             { keywords: ['white_heart'], char: '🤍' },
             { keywords: ['brown_heart'], char: '🤎' },
             { keywords: ['broken_heart'], char: '💔' },
             { keywords: ['heart_exclamation'], char: '❣️' },
             { keywords: ['two_hearts'], char: '💕' },
             { keywords: ['revolving_hearts'], char: '💞' },
             { keywords: ['heartbeat'], char: '💓' },
             { keywords: ['heartpulse'], char: '💗' },
             { keywords: ['sparkling_heart'], char: '💖' },
             { keywords: ['cupid'], char: '💘' },
             { keywords: ['gift_heart'], char: '💝' },
             { keywords: ['heart_decoration'], char: '💟' },
             { keywords: ['peace_symbol'], char: '☮️' },
             { keywords: ['latin_cross'], char: '✝️' },
             { keywords: ['star_and_crescent'], char: '☪️' },
             { keywords: ['om'], char: '🕉️' },
             { keywords: ['wheel_of_dharma'], char: '☸️' },
             { keywords: ['star_of_david'], char: '✡️' },
             { keywords: ['six_pointed_star'], char: '🔯' },
             { keywords: ['menorah'], char: '🕎' },
             { keywords: ['yin_yang'], char: '☯️' },
             { keywords: ['orthodox_cross'], char: '☦️' },
             { keywords: ['place_of_worship'], char: '🛐' },
             { keywords: ['ophiuchus'], char: '⛎' },
             { keywords: ['aries'], char: '♈' },
             { keywords: ['taurus'], char: '♉' },
             { keywords: ['gemini'], char: '♊' },
             { keywords: ['cancer'], char: '♋' },
             { keywords: ['leo'], char: '♌' },
             { keywords: ['virgo'], char: '♍' },
             { keywords: ['libra'], char: '♎' },
             { keywords: ['scorpius'], char: '♏' },
             { keywords: ['sagittarius'], char: '♐' },
             { keywords: ['capricorn'], char: '♑' },
             { keywords: ['aquarius'], char: '♒' },
             { keywords: ['pisces'], char: '♓' }
           ]
         }
       },
       
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