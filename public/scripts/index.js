/**
 * Created by jiajia on 2017/4/17.
 */

// var data = [
//   {id:1, author: 'Pete Hunt', text: 'This is one comment'},
//   {id:2, author: 'Jordan', text: 'This is *another* comment'}
// ];

var Comment = React.createClass({
  rawMarkup: function () {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function () {

    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
          <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
      );
    });

    return (
      <div className="commentList">{commentNodes}</div>
    );

  }
});

var CommentForm = React.createClass({
    render : function () {
      return (
        <div className="commentForm">
          Hello, world! I am a commentForm.
        </div>
      );
    }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache:false,
      success:function (data) {
        this.setState({data:data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {data:[]}
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer,this.props.pollInterval);
  },
  render: function () {
    return (
      <div className='commentBox'>
        Hello, world! I am a commentBox.
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
