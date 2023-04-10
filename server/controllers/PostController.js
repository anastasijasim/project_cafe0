import PostModel from '../models/Post.js';

// export const getLastTags = async (req, res) => {
//   try {
//     const posts = await PostModel.find().limit(5).exec();

//     const tags = posts
//       .map((obj) => obj.tags)
//       .flat()
//       .slice(0, 5);

//     res.json(tags);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось получить тэги',
//     });
//   }
// };

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get articles',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate('user');

    if (!doc) {
      return res.status(404).json({
        message: 'No article was found',
      });
    }

    res.json(doc);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get articles',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Article not found or cannot be deleted',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to delete article',
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create an article',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, text, imageUrl } = req.body;

    if (!title || !text || !imageUrl) {
      return res.status(400).json({
        message: 'Required fields are not filled in',
      });
    }

    const post = await PostModel.findOne({ _id: postId });

  
    if (post.user.toString() !== req.userId) {
      return res.status(401).json({
        message: 'You cannot update this article',
      });
    }


    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        imageUrl,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update the article',
    });
  }
};