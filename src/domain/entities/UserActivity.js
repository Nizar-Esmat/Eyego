class UserActivity {
  constructor(data) {
    this.userId = data.userId;
    this.eventType = data.eventType;
    this.action = data.action;
    this.metadata = data.metadata || {};
    this.timestamp = data.timestamp || new Date();
  }
}

export default UserActivity;
