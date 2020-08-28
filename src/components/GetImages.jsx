
import React, { Component } from 'react'
import axios from 'axios'
import './image.css'

export default class GetImages extends Component {
    constructor() {
        super();
        this.state = { data: [], loading:true, successCount: 0, errorCount: 0, active: "hidden" };
    }

    toggleMenu = () => {

        var css = (this.state.active === "hidden") ? "show" : "hidden";
        this.setState({ "active": css });
    }

    fetchingImages = (sku) => {
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

    async componentDidMount() {
        let response = [];
        let sCount = 0;
        let eCount = 0;
        for await (let item of this.fetchingImages(this.props.sku)) {
            let result;
            try {
                result = await axios(item.url);
                response.push({ ...item, status: result.status })
                if(item.name == 'wrap')
                    console.log(result)
                if (result.status == 200) {
                    sCount++;
                } else {
                    eCount++;
                }

            } catch (err) {
                eCount++;
                response.push({ ...item, status: 404 })
                console.log(err)
            }
        }

        this.setState({ data: response, successCount: sCount, errorCount: eCount, loading: false });

    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <a onClick={this.toggleMenu}>{this.state.successCount} Success {this.state.errorCount} Error</a>
                    <ul className={this.state.active}>
                        {this.state.data.map((item, i) => {

                            return <li key={i}>{item.name} - {item.status}</li>

                        })}
                    </ul>
                </div>
            );
        }
    }
}