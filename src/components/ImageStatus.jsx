

import React, { useState, useEffect } from "react";

const ImageStatus = (props) => {

    const fetchingImages = (sku) => {
        var paintingTypes = [];
        paintingTypes["paper"] = ["Black", "Brown", "NaturalBrown", "White"];
        paintingTypes["canvas"] = ["Black", "Brown", "NaturalBrown"];
        var url = "https://cdn.imfpa.org/paintings/";

        var images = [];
        var image = url + sku + "_800.jpg";
        images.push({ name: 'print', url: image })
        image = url + sku + "_O.jpg";
        images.push({ name: 'wrap', url: image })

        paintingTypes["paper"].forEach(color => {
            for (let size = 30; size < 90; size += 10) {
                var image = url + sku + "_800-" + size + "cm-" + color + "-0.75.jpg";
                images.push({ name: 'paper-' + size + '-' + color, url: image })
            }
        });

        paintingTypes["canvas"].forEach(color => {
            for (let size = 30; size < 90; size += 10) {
                var image = url + sku + "_800-" + size + "cm-" + color + "-0.5.jpg";
                images.push({ name: 'canvas-' + size + '-' + color, url: image })
            }
        });
        return images;
    };


    return (
        <ul>
            {fetchingImages(props.sku).map(item => {

                return <li>{item.url}</li>

            })}
        </ul>
    );
};
export default ImageStatus;
