const Canvas = require("canvas");
const Discord = require("discord.js");

const background = "https://i.imgur.com/dnRw3GP.jpeg";

const dimension = {
  width: 1332,
  height: 850,
  margin: 50,
};

const avatar = {
  size: 256,
  x: 552,
  y: 250,
};

const generateWelcomeImage = async (user) => {
  let tag = user.tag;
  let avatarUrl = user.displayAvatarURL({
    format: "jpg",
    dynamic: false,
    size: avatar.size,
  });

  const canvas = Canvas.createCanvas(dimension.width, dimension.height);
  const ctx = canvas.getContext("2d");

  const backgroundImg = await Canvas.loadImage(background);
  ctx.drawImage(backgroundImg, 0, 0);

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(
    dimension.margin,
    dimension.margin,
    dimension.width - 2 * dimension.margin,
    dimension.height - 2 * dimension.margin
  );

  const avatarImg = await Canvas.loadImage(avatarUrl);
  ctx.save();

  ctx.beginPath();
  ctx.arc(
    avatar.x + avatar.size / 2,
    avatar.y + avatar.size / 2,
    avatar.size / 2,
    0,
    2 * Math.PI,
    true
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatarImg, avatar.x, avatar.y);
  ctx.restore();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.font = "normal normal bold 100px roboto";
  ctx.fillText("WELCOME", avatar.x + avatar.size / 2, avatar.y - 10);

  ctx.font = "normal normal bold 80px roboto";
  ctx.fillText(tag, avatar.x + avatar.size / 2, avatar.y + 340);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "WelcomeImage.png"
  );
  return attachment;
};

module.exports = generateWelcomeImage;
