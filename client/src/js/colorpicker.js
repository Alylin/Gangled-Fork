import React, {useEffect} from 'react';

function ColorPicker() {
    useEffect(() => {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");

        let img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 1000, 1000);
        }
        img.src = "/colorRing2.png";

        let img2 = new Image();
        img2.onload = function() {
            ctx.drawImage(img2, 0, 0, 1000, 1000);
        }
        img2.src = "/colorTriangle2.svg";
    }, []);

    return (
        <div>
            <canvas id="canvas" width="1000" height="1000" className="w-56 h-56" />
        </div>
    );
}

export default ColorPicker;