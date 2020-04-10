// App
import React from 'react'

class Article extends React.Component {
    render() {
        return (
            <div className="article-block">
                <div className="row">
                    <div className="col-md-6 row">
                        <div className="col-md-1">
                            <span>{this.props.article.id}</span>
                        </div>
                        <div className="col-md-3">
                            <span>{this.props.article.carName}</span>
                        </div>
                        <div className="col-md-4">
                            <span>{this.props.article.fromLocation}</span>
                        </div>
                        <div className="col-md-4">
                            <span>{this.props.article.toLocation}</span>
                        </div>
                    </div>
                    <div className="col-md-6 row">
                        <div className="col-md-3">
                            <span>{this.props.article.cargo}</span>
                        </div>
                        <div className="col-md-3">
                            <span>{this.props.article.created_at}</span>
                        </div>
                        <div className="col-md-3">
                            <span>{this.props.article.price}</span>
                        </div>
                        <div className="col-md-3">
                            <span>Рейтинг: {this.props.article.rating}</span>
                        </div>
                    </div>
                    <div className="col-md-12 article-actions">
                        <Link to="/register"><Button type="fill" paddingVertical={"5px"} paddingHorizontal={"25px"} fontSize={"14px"}>ВЗЯТЬ</Button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Article