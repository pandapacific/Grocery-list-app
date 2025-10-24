const Footer = ({length}) => {

    return (
        <footer>
            <p>
                {length} {length === 1 ? "item" : "items"} left.
            </p>
        </footer>
    )
}

export default Footer