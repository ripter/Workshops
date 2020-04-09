// Updates the Dialog Message Text/Avatar
export function updateMessage(state, dialogMeta) {
  const { currentPage, currentAvatar } = state;
  const elText = state.dialog.getChildByName('message');
  const elAvatar = state.dialog.getChildByName('avatar');
  const elIconWait = state.dialog.getChildByName('iconWait');

  // Should we clear/hide everything?
  if (!dialogMeta) {
    elAvatar.visible = false;
    elText.visible = false;
    elIconWait.visible = false;
  }
  // Update/Render it!
  else {
    const message = dialogMeta.pages[currentPage];
    elAvatar.texture = currentAvatar;
    elText.text = message;
    elAvatar.visible = true;
    elText.visible = true;
    elIconWait.visible = true;
  }
}
