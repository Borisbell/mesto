export class UserInfo {
  constructor(profileNameSelector, profileJobSelector, avatarSelector){
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job : this._jobElement.textContent,
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  getUserAvatar() {
    return {
      avatar: this._nameElement.src,
    }
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

}
