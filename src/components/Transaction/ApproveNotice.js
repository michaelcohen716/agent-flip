import React from "react"
import "./Approve.css";

function ApproveNotice({ assetName }){
    return (
        <div className="position-relative">
            <div className="position-absolute d-flex flex-column approve-notice">
                <div className="mx-auto mt-2">
                    Before transacting in {assetName}, <br/>
                    please approve the token  <br/>
                    function. For better UX, <br/>
                    we've chosen a large amount. <br/>
                    Just press approve!
                </div>
            </div>
        </div>
    )
}

export default ApproveNotice;