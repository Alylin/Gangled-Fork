import mathHelper from "../../utilities/mathhelper";

const speed = 0.03;
const overshotCompensation = 0.02;
class LittleDude {
    constructor(posX, posY, width, height, children) {
        this.posX = posX;
        this.posY = posY;
        this.rotation = 0;
        this.grabbedPos = null;
        this.rotationSpeed = 0;
        this.desiredRotation = 0;
        this.width = width;
        this.height = height;
        this.children = children || [];
        
        if (this.children.length ) {
            this.children[0].grabbedPos = {
                x: 0,
                y: 0
            }
            this.children[0]._setDesiredRotation(0, 0);
        }
    }

    _stopSwing(desiredRotation, grace) {
        const absoluteRotationSpeed = Math.abs(this.rotationSpeed);
        const distanceFromDesiredRotation = Math.abs(this.rotation - desiredRotation);
        if ((absoluteRotationSpeed < grace) && (distanceFromDesiredRotation < grace)) {
            this.rotationSpeed = 0;
            this.rotation = this.desiredRotation;
        }
    }

    _closerPositive(desiredRotation, rotation) {
        if (rotation < desiredRotation) {
            let desiredRotationNegative = desiredRotation - 6.28319;
            const diffPositive = Math.abs(rotation - desiredRotation);
            const diffNegative = Math.abs(rotation - desiredRotationNegative);
            return diffPositive < diffNegative;
        }
        else {
            let desiredRotationBig = desiredRotation + 6.28319;
            const diffPositive = Math.abs(rotation - desiredRotationBig);
            const diffNegative = Math.abs(rotation - desiredRotation);
            return diffPositive < diffNegative;
        }
    }
    
    _swingTowardsDesiredRotation(desiredRotation) {
        this.rotation = mathHelper.modulo(this.rotation, 6.28319);
        desiredRotation = mathHelper.modulo(desiredRotation, 6.28319);

        this._stopSwing(desiredRotation, 0.05);
        if (desiredRotation !== this.rotation) {
            if (this._closerPositive(desiredRotation, this.rotation)) {
                if (this.rotationSpeed < 0) {
                    this.rotationSpeed = this.rotationSpeed + overshotCompensation;
                }
                this.rotationSpeed = this.rotationSpeed + speed;
            }
            else { 
                if (this.rotationSpeed > 0) {
                    this.rotationSpeed = this.rotationSpeed - overshotCompensation;
                }
                this.rotationSpeed = this.rotationSpeed - speed;
            }
        }
        this.rotation = mathHelper.roundTo(this.rotation + this.rotationSpeed, 2);
    }

    getCenter() {
        const xFromCenter = this.grabbedPos.x - (this.width);
        const yFromCenter = this.grabbedPos.y - (this.height);
        const newPoint = mathHelper.getPointAlongAngle(this.posX + this.grabbedPos.x, this.posY + this.grabbedPos.y, xFromCenter, this.rotation);
        return mathHelper.getPointAlongAngle(newPoint.x, newPoint.y, yFromCenter, this.rotation + 1.5708);
    }

    _updatePosition(posX, posY) {
        this.posX = posX - this.grabbedPos.x;
        this.posY = posY - this.grabbedPos.y;
    }

    _setDesiredRotation(posX, posY) {
        this.desiredRotation = mathHelper.getAngleOfLine(posX, this.posY+(this.height/2), this.posX+(this.width/2), posY)
    }

    hitTest(posX, posY) {
        return (posX > this.posX && posX < this.posX+this.width ) && (posY > this.posY && posY < this.posY+this.height );
    }

    tick() {
        if (this.grabbedPos) {
            if (this.lastPosX !== this.posX && this.lastPosX !== this.posY) {
                let desiredRotation2 = mathHelper.getAngleOfLine(this.lastPosX, this.lastPosY, this.posX, this.posY);
                let a = this.posX - this.lastPosX;
                let b = this.posY - this.lastPosY;
                let c = Math.sqrt( a*a + b*b );
                desiredRotation2 = this.desiredRotation + (desiredRotation2/(21-Math.min(20, c)));
                this._swingTowardsDesiredRotation(desiredRotation2);
            }
            else {
                this._swingTowardsDesiredRotation(this.desiredRotation);
            }
            this.lastPosX = this.posX;
            this.lastPosY = this.posY;
            
            this.children.forEach(child => {
                const center = this.getCenter();
                child._updatePosition(center.x, center.y); //test108 fix this and we're good.
            });
            
            this.children.forEach(child => {
                child.tick();
            });
        }
    }

    paint(canvas) {
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(this.posX, this.posY);
        if (this.grabbedPos) {
            ctx.translate(this.grabbedPos.x, this.grabbedPos.y);
        }
        ctx.rotate(this.rotation);
        if (this.grabbedPos) {
            ctx.translate(-this.grabbedPos.x, -this.grabbedPos.y);
        }

        if (!this.gradient) {
            this.gradient = ctx.createLinearGradient(29, 0, 31, 0);
            this.gradient.addColorStop(0, 'green');
            this.gradient.addColorStop(1, 'red');
        }
        
        ctx.fillStyle = this.gradient;

        ctx.fillRect(0, 0, this.width, this.height);
        
        ctx.restore();
        this.children.forEach(child => {
            child.paint(canvas);
        });
    }

    onGrab(pos) {
        this.grabbedPos = {
            x: pos.x - this.posX,
            y: pos.y - this.posY
        }
        this._setDesiredRotation(pos.x, pos.y);
        this._updatePosition(pos.x, pos.y);
    }

    onMove(pos) {
        this._updatePosition(pos.x, pos.y);
    }

    onRelease() {
        this.grabbedPos = null;
        this.rotationSpeed = 0;
        // test108 make the position stuff make sense pls.
        this.rotation = 0;
    }
}

export default LittleDude;