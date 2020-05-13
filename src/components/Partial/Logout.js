import React from 'react';
import client from "../../config/client";

function Logout(props) {
    const clearStore = async () => {
        localStorage.removeItem("userID");
        await client.clearStore();
        props.history.push("/");
        window.location.reload();
    }

    return (
        <div>
            {clearStore()}
        </div>
    )
}

export default Logout
