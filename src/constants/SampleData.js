export const sampleChats = [{
  avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: '1',
  groupChat: "false",
  members: ["1", "2"],
}, {
  avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boa",
  _id: '2',
  groupChat: "false",
  members: ["1", "2"],
},]

export const sampleUsers = [{
  avatar: "http://www.w3schools.com/howto/img_avatar.png",
  name: "John Doe",
  _id: '1',
}, {
  avatar: "http://www.w3schools.com/howto/img_avatar.png",
  name: "John Boa",
  _id: '2',
}, {
  avatar: "http://www.w3schools.com/howto/img_avatar.png",
  name: "John Coo",
  _id: '3',
}, {
  avatar: "http://www.w3schools.com/howto/img_avatar.png",
  name: "John Foo",
  _id: '4',
}, {
  avatar: "http://www.w3schools.com/howto/img_avatar.png",
  name: "John Bar",
  _id: '5',
}];

export const sampleNotifications = [{
  sender: {
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
  },
  _id: '1',
}, {
  sender: {
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    name: "John Boa",
  },
  _id: '2',
}, {
  sender: {
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    name: "John Coo",
  },
  _id: '3',
}, {
  sender: {
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    name: "John Foo",
  },
  _id: '4',
}, {
  sender: {
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    name: "John Bar",
  },
  _id: '5',
}];

export const sampleMessages = [
  {
    attachments: [
      {
        public_id: "sample_id_1",
        url: "https://example.com/sample1.jpg",
      },
    ],
    content: "Hello, how are you?",
    _id: "1",
    sender: {
      _id: "1", // ✅ Matches user._id
      name: "John Doe",
    },
    chat: "chatId",
    createdAt: "2023-03-15T12:00:00Z",
  },
  {
    attachments: [
      {
        public_id: "sample_id_2",
        url: "https://example.com/sample2.jpg",
      },
    ],
    content: "I'm fine, thanks! How about you?",
    _id: "2",
    sender: {
      _id: "2", // 👤 Another user
      name: "John Boa",
    },
    chat: "chatId",
    createdAt: "2023-03-15T12:01:00Z",
  },

];

export const dashboardData = {
  users: [{
    name: "John doe",
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    _id: "1",
    username: "john_doe",
    friends: 20,
    groups: 5,
  }, {
    name: "John boa",
    avatar: "http://www.w3schools.com/howto/img_avatar.png",
    _id: "2",
    username: "john_boa",
    friends: 10,
    groups: 4,
  },],

  chats: [{
    name: "John boe",
    avatar: ["http://www.w3schools.com/howto/img_avatar.png"],
    _id: "1",
    groupChat: false,
    members: [{ _id: "1", avatar: "http://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "http://www.w3schools.com/howto/img_avatar.png" }],
    totalMembers: 2,
    totalMessages: 20,
    creator: {
      name: "John boa",
      avatar: "http://www.w3schools.com/howto/img_avatar.png",
    },
  },],


  messages: [{
    attachments: [],
    name: "John boe",
    content: "ksi k msg hai",
    _id: "1",
    sender: {
      avatar: "http://www.w3schools.com/howto/img_avatar.png",
      name: "Chaman",
    },
    chat: "chatId",
    groupChat:false,
    createdAt: "2024-02-12T10:41:30.6302",
  },
  ]
}