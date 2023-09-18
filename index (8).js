const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const botConfig = require('./scripts/bot');
const settings = require('./settings'); 
// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot(global.TOKEN, { polling: true, privacy: false });
const pink = '\x1b[35m';
// Listen for text messages
bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const text = msg.text.toLowerCase();

  // Check if the user's message matches a trigger
  if (text === 'mia' || text === 'skylarx' || text === 'aylxs') {
    // Log the action
    console.log(blue,`${pink}${text}${blue} Image Sent to ${fullyel}${username}${reset}`);

    // Call the function to send a random image with a caption and pass 'text' as an argument
    sendRandomImage(
      chatId,
      `./models/${text}.json`,
      `${caption}`,
      {
        reply_to_message_id: msg.message_id,
      },
      text // Pass the 'text' variable as an argument
    );
  } else {
    // Handle other messages or commands here
  }
});


// Define your bot's version
const version = '1.0';

// Utility function to generate a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to send a random image from a JSON file as a reply with a caption
function sendRandomImage(chatId, jsonFilePath, caption, options, text) {
  try {
    // Load the JSON file containing image paths
    const jsonData = require(jsonFilePath);
    const images = jsonData.images;

    // Get a random index to select a random image
    const randomIndex = getRandomInt(0, images.length - 1);
    const randomImage = images[randomIndex];

    // Send the random image as a reply to the original message with the caption
    bot.sendPhoto(chatId, randomImage, {
      caption: caption,
      ...options,
    })
      .then(() => {
        console.log(blue,`${pink}           ${blue}                                        `);
      })
      .catch((error) => {
        console.error(`Error sending random ${text} Image to chat ${chatId}`, error);
      });
  } catch (error) {
    console.error('Error loading JSON data:', error);
  }
}


// Keyboard markup for the anime category options
const animeCategoryKeyboard = {
  reply_markup: {
    keyboard: [['mia', 'skylarx','aylxs']],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};


// Listen for the /anime command
bot.onText(/(model)/, (msg, match) => {
  const chatId = msg.chat.id;
  const model = './img.jpg';
  const logo = './image.jpg';
  const pinki = '\x1b[45m';
  const username = msg.from.username;
// Create a caption with the error message and send it along with the image
    const categorymsg = 'Choose A Model You Want Using Buttons And Check Model List Using /checklist';

  bot.sendPhoto(chatId, `${model}`,{
    reply_markup: keyboard.reply_markup,
    reply_to_message_id: msg.message_id,
    caption: categorymsg,
    animeCategoryKeyboard,
  });
  console.log('');
       console.log(pinki,`Sending Models Menu To ${username}             ${reset}`);
  console.log('');

});

// Listen for the /check command
bot.onText(/(checklist)/, (msg, match) => {
  const chatId = msg.chat.id;

  // Send a "hello" message in response to /check
  bot.sendMessage(chatId, '\n\nWe Added These Models To Bot:\n\n 1.Mia Khalifa\n\n 1.AylxStar\n\n 2.SkylarVox\n\n', {
    reply_to_message_id: msg.message_id, // Set the message ID to reply to the /new command
  });
});

bot.onText(/\/version/, (msg) => {
  const chatId = msg.chat.id;
  
  const botcap = 'ғᴜʟʟᴠɪᴅᴋ ʜᴇɴᴛᴀɪ ʙᴏᴛ ₂₀₂₃';
  const version = `This Is 2023 First Release\n( ${botcap} )\n\nVersion Number: V2\n\nGit Repository:\nhttps://uncknownguy.github.io`;
  bot.sendPhoto(chatId, './image.jpg', {
    reply_to_message_id: msg.message_id,
    caption: version, // Changed ";" to ":"
  });
});

const ownerChatId = 1682541342; // Replace with your owner's chat ID

//Listen for the /getgroupid command
bot.onText(/\/id/, (msg) => {
  const chatId = msg.chat.id;

  // Check if the message is from a group chat
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    // Send the group chat ID to the user
    bot.sendMessage(chatId, `The Group Chat ID is: ${chatId}`);
  } else {
    // Inform the user that they are not in a group chat
    bot.sendMessage(chatId, 'You are not in a group chat.');
  }
});



// Define your two group IDs
const groupId1 = -1001962250887;
const groupId2 = -1001892164817;
const red = '\x1b[31m';
const green = '\x1b[42m';
const yellow = '\x1b[43m';
const fullyel = '\x1b[33m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';
// Reset text color
const reset = '\x1b[0m';

const keyboard = {
  reply_markup: {
    keyboard: [
      ['menu'],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send a simple text message as a reply to the /start command
  bot.sendMessage(chatId, 'Welcome to the bot!', {
    reply_to_message_id: msg.message_id,
    reply_markup: keyboard.reply_markup,
  });
});

let isListening = false;

// Listen for other messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  
  // Check if the message is the "/start" command
  if (messageText === '/forward') {
    isListening = true;
    const cap = ` ${caption}`;
  bot.sendMessage(chatId, 'Forward Is Activated ✅', {
         reply_to_message_id: msg.message_id,   
          });
    console.log(white, `${green}You Activated Forward Media Feature${reset}`);
  }
  // Check if the message is the "/off" command
  else if (messageText === '/forwardoff') {
    isListening = false;
    bot.sendMessage(chatId,'Forward  Is Deactivated ✅', {
      
      reply_to_message_id: msg.message_id,
       });
    
    console.log(white, `${red}You Deactivated Forward Media Feature`);
  } 
  // Handle other messages if the bot is currently listening
  else if (isListening) {
    if (msg.photo || msg.video || msg.text) {
      // Forward the received photo or video to the first group
            // Forward the received photo or video to the first group

      bot.forwardMessage(global.GROUP_ONE_ID, chatId, msg.message_id)
        .then(() => {
          bot.sendMessage(chatId, `Forwarded Message To Group One ✅ `);
        })
        .catch((error) => {
       // Send the error message to the user's chat
    bot.sendMessage(chatId, '⚠ 𝗘𝗿𝗿𝗼𝗿 𝗙𝗼𝗿𝘄𝗮𝗿𝗱𝗶𝗻𝗴 𝗧𝗼 𝗚𝗿𝗼𝘂𝗽 𝗢𝗻𝗲 ⚠\n\nThis Error Can Be Appear If,\n\n 1. Not Added Group Two Id\n\n 2.Not Added To Group As Admin'); 
        });
      // Forward the received photo or video to the second group

      
      bot.forwardMessage(global.GROUP_TWO_ID, chatId, msg.message_id)
        .then(() => {
          bot.sendMessage(chatId, `Forwarded Message To Group Two ✅`);
        })
        .catch((error) => {
          // Send the error message to the user's chat
    bot.sendMessage(chatId, 'Error forwarding media to group 1. Please try again later.');
        });
    }
  }
});

//Define the available categories and their corresponding JSON files
const categories = {
  'bdsm': './erotic/bdsm.json',
  'creampie': './erotic/creampie.json',
  'threesome': './erotic/threesome.json',
};


bot.onText(/(erotic)/ , (msg, match) => {
  const chatId = msg.chat.id;
  const pinki = '\x1b[45m';
  const username = msg.from.username;
  // Create a custom keyboard with category options
 const keyboard = {
  reply_markup: {
    keyboard: [
      ['bdsm', 'creampie'],
      ['threesome', 'pakaya', 'paka'],
      ['dog', 'girl'],
      ['keks', 'huma']
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
  
  console.log(pinki, `Sending Erotic Menu To ${username} ${reset}`);
  console.log('')
const model = process.env.MODEL_IG;


// Send the photo with the defined caption
bot.sendPhoto(chatId, `${model}`, {
  caption: caption,
  reply_markup: keyboard.reply_markup,
  reply_to_message_id: msg.message_id, 
  // Add the caption here
})
  
    
  .catch((error) => {
    console.error('Error sending photo:', error);
  });
});

const caption = 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ғᴜʟʟᴠɪᴅᴋ ʜᴇɴᴛᴀɪ ʙᴏᴛ ₂₀₂₃';










// Define your custom keyboard
const customKeyboard = {
  keyboard: [
    ['/model', 'Button 2'],
    ['Button 3', 'Button 4'],
  ],
  resize_keyboard: true,
  one_time_keyboard: true,
};

// Listen for the /start command
bot.onText(/\/test/, (msg) => {
  const chatId = msg.chat.id;

  // Send a message with the inline keyboard
  bot.sendMessage(chatId, 'Choose an action:', {
    reply_markup: customKeyboard,
  });
});















// Listen for category selections (/one, /two, /three)
bot.onText(/\/(bdsm|creampie|threesome|pakaya)/, (msg, match) => {
  const chatId = msg.chat.id;
  const category = match[1];
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[43m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';
const username = msg.from.username;
// Reset text color
const reset = '\x1b[0m';
  
  // Check if the selected category exists
  if (categories.hasOwnProperty(category)) {
    const jsonFile = categories[category];

    // Read the JSON file
    fs.readFile(jsonFile, 'utf8', (err, data) => {
      if (err) {
        bot.sendMessage(chatId, 'Error reading JSON file.');
      } else {
        try {
          const jsonData = JSON.parse(data);

          // Log that images are being sent
          console.log(` ${red}${category}${reset} Images List Sent To ${yellow} ${username} ${reset} `);
        console.log('')  
          // Send all images from the JSON file to the user as separate messages
          
          jsonData.images.forEach((imageUrl) => {
            bot.sendPhoto(chatId, imageUrl, {
            reply_to_message_id: msg.message_id,
            caption});
          });
        } catch (error) {
          bot.sendMessage(chatId, 'Error parsing JSON data.');
        }
      }
    });
  } else {
    bot.sendMessage(chatId, 'Invalid category. Please choose a valid category.');
  }
});

// Listen for category selections from the keyboard
bot.onText(/(bdsm|creampie|threesome)/, (msg, match) => {
  const chatId = msg.chat.id;
  const category = match[0];

  // Check if the selected category exists
  if (categories.hasOwnProperty(category)) {
    const jsonFile = categories[category];

    // Read the JSON file
    fs.readFile(jsonFile, 'utf8', (err, data) => {
      if (err) {
        bot.sendMessage(chatId, 'Error reading JSON file.');
      } else {
        try {
          const jsonData = JSON.parse(data);

          // Get a random image URL from the JSON file
          const randomImage = getRandomItem(jsonData.images);

  const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[43m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';
const pink = '\x1b[35m';
// Reset text color
const reset = '\x1b[0m';

const username = msg.from.username;      
          // Log that an image is being sent
          console.log(blue,`${pink}${category}${blue} Image Sent to ${fullyel}${username}${reset}`);
// Add a caption to the image     
  console.log(blue,`${pink}           ${blue}                                        `)
          // Send the random image to the user
         bot.sendPhoto(chatId, randomImage, {
         reply_to_message_id: msg.message_id,
            caption: caption,
          }); 
        } catch (error) {
          bot.sendMessage(chatId, 'Error parsing JSON data.');
          }
      }
    });
  } else {
    bot.sendMessage(chatId, 'Invalid category. Please choose a valid category');
  }
});

// Function to get a random item from an array
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Start listening for incoming messages
bot.on('polling_error', (error) => {
  console.error(error);
});

// Define the path to your image
const imagePath = './image.jpg';

bot.onText(/\/voi/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendVoice(chatId, './Alawwa.mp3');
});
           
// Listen for the /menu command
bot.onText(/(menu)/, (msg, match) => {
  const chatId = msg.chat.id;
  const botcap = `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ғᴜʟʟᴠɪᴅᴋ ʜᴇɴᴛᴀɪ ʙᴏᴛ ₂₀₂₃`;
  const caption = `${botcap}\n\mChoose a Option From Buttons`;
  const borderRadius = 20; // Adjust the border radius as needed
  const keyboard = {
    reply_markup: {
      keyboard: [['model', 'erotic']],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
  
  bot.sendPhoto(chatId, './image.jpg', {
    reply_markup: keyboard.reply_markup,
    reply_to_message_id: msg.message_id,
    caption: caption,
  });
});

  

const botcap = 'FullVidk V2';

console.log(`${yellow}${botcap} Bot is running...`);

// Listen for incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Check if the message is the "/start" command
  if (messageText === 'group') {
    try {
      // Attempt to get the group name
      const groupName = msg.chat.title;

      if (groupName) {
        bot.sendMessage(chatId, `This group is named: ${groupName}`);
      } else {
        bot.sendMessage(chatId, 'This is not a group or the bot does not have the necessary permissions to access group details.');
      }
    } catch (error) {
      console.error('Error accessing group name:', error);
      bot.sendMessage(chatId, 'An error occurred while accessing group information.');
    }
  }
});