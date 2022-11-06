const mathHelper = {
    getPointAlongAngle: (posX, posY, distance, angle) => {
        let xModifier = (distance * Math.cos(angle));
        let yModifier = (distance * Math.sin(angle));
        return {
            x: posX - xModifier,
            y: posY - yModifier
        };
    },

    getAngleOfLine(posX, posY, posX2, posY2) {
        const deltaY = (posY - posY2);
        const deltaX = (posX - posX2);
        let result = Math.atan2(deltaY, deltaX); 
        return (result - 1.5708) || 0;
    },

    roundTo: (number, decimals) => {
        const modifier = Math.pow(10, decimals);
        return Math.round(number * modifier)/modifier
    },

    modulo(number1, number2) {
        return ((number1 % number2) + number2) % number2;
    } 
};

export default mathHelper;