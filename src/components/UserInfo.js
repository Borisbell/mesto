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

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
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
