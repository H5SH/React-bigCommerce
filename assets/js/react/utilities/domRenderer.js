
function domRender(Component, node_address){
    const node = document.querySelector(node_address)
    if(node){
        ReactDOM.createRoot(node).render(<Component />)
    }
}