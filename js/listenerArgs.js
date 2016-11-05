const Setting_Mouse_Arg = {
    event : cc.EventListener.MOUSE,
    eventName : "Setting btn event arg",
    target : null,
    callback : null,
    swallowTouches: true,
    isHit:false,
    onMouseDown(event){
        if(this.isHitTarget(event)){
            this.target.popSetting();
        }
    },
    isHitTarget(event){
        let t = event.getCurrentTarget(),gp = event.getLocation(),np = t.convertToNodeSpace(gp),
            ts = t.getContentSize(),tArea = cc.rect(0,0,ts.width,ts.height);
        if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
        {
            return cc.rectContainsPoint(tArea,np);
        }
    }
};





