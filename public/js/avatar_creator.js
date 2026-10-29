
const avatarImg = document.getElementById('img-user-avatar');

function createAvatar() {

    const seed = Math.random().toString(36).substring(2, 15);

    const avatarUrl = `https://api.dicebear.com/10.x/pixelbot/svg?backgroundColor=061626&glowColor=22d3ee&tags=animation&seed=${seed}`;

    avatarImg.src = avatarUrl;

}

createAvatar();