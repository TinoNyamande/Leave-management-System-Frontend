import "./BackGround.css"
function BackGround ({children}) {
    return (
        <div className="background-container">
            {children}
        </div>
    )
}
export default BackGround