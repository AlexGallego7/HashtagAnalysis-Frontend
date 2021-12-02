import React from 'react'

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: parseInt(this.props.match.params.id),
            user: []
        }
    }

    componentDidMount() {

        let url = "http://127.0.0.1:8000/users" + this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const user = this.state.user
        return (
            <div>
                <p>
                    <strong>Username: </strong>
                    {user.username}
                </p>
                <p>
                    <strong>Created at:</strong>
                    {user.created_at}
                </p>
                <p>
                    <strong>About:</strong>
                    {user.about}
                </p>
            </div>
        )
    }
}

export default UserProfile