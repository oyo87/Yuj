const UserCamera = (props) => {

    const imgTagName = props.imgTagName;
    const canvasTagName = props.canvasTagName;
    const imgSrc = props.imgSrc;
    const width = props.width ? props.width:1000;
    const height = props.height ? props.height:1000;

    return(
        <>
            <div className="video-div">
                <canvas id={canvasTagName} width={width} height={height}></canvas>
                <img id={imgTagName} src={imgSrc} width={width} height={height}></img>
            </div>
        </>
    )

}

export default UserCamera;