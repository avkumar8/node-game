var FocusedObjectView = function(el){
  this.mainEl = el;
  console.log('el', el)
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
  this.keyPress = this.keyPress.bind(this);
  this.skillClicked = this.skillClicked.bind(this);
  window.addEventListener('keydown',this.keyPress,false);

}

FocusedObjectView.prototype = {
  setBoard: function(board){
    this.board = board;
  },
  render: function(){
    var focused =  this.board.findFocusedControllable();
    this.headerEl.innerHTML = focused.name;
    this.skillsEl.innerHTML = "";
    for (skill in focused.skills){
      var skillItem = window.document.createElement('li');
      var skillButton = window.document.createElement('a');
      // skillButton.onClick = this.skillClicked;
      skillButton.addEventListener('click',this.skillClicked,false);
      skillButton.innerHTML = skill;
      console.log('this', this);
      skillItem.appendChild(skillButton);
      this.skillsEl.appendChild(skillItem);
    }
  },

  skillClicked: function(el){
    console.log('skill was clicked this', this);
    console.log('element', el);
    var focused =  this.board.findFocusedControllable();
    var methodName = focused.skills[el.target.innerHTML];
    console.log('methodName', methodName);
    focused[methodName]();
  },

  keyPress: function(ev){
    var target = this.board.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      switch (ev.keyCode){
        case 38://up
          target.movePosition({x:0,y: -moveAmount})
          break;
        case 40://down
          target.movePosition({x:0,y: moveAmount})
          break;
        case 37://left
          target.movePosition({x:-moveAmount,y: 0})
          break;
        case 39://right
          target.movePosition({x:moveAmount,y: 0})
          break;
        case 13://enter
          if (target.item){
            target.dropAll()
          }
          else {
            target.pickUpFirstCloseItem()
          }
          break;
        // case 17://cttl
        //   this.board.focusOnNext()
        //   break;
      }
    }
  }
}
module.exports = FocusedObjectView