const { StatusCodes } = require('http-status-codes');

const Product = require('../models/Product');
const NotFoundError = require('../errors/notFound');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getAllProducts = asyncWrapper(async (req, res, next) => {
  const qNew = req.query.new;
  const cat = req.query.category;
  let products;

  if (qNew) {
    products = await Product.find().sort('-createdAt').limit(5);
  } else if (cat) {
    products = await Product.find({ categories: { $in: [cat] } });
  } else {
    products = await Product.find();
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    counts: products.length,
    products,
  });
});

exports.getProductById = asyncWrapper(async (req, res, next) => {
  const { id: prodID } = req.params;

  const product = await Product.findById(prodID);

  if (!product) {
    return next(
      new NotFoundError(`No product found with the given ID: ${prodID}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    product,
  });
});

exports.getProductBySlug = asyncWrapper(async (req, res, next) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug });

  if (!product) {
    return next(
      new NotFoundError(`No product found with the given SLUG: ${slug}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    product,
  });
});

exports.createProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    product,
  });
});

exports.updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: prodID } = req.params;

  const updProduct = await Product.findByIdAndUpdate(
    prodID,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updProduct) {
    return next(
      new NotFoundError(`No product found with the given ID: ${prodID}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    product: updProduct,
  });
});

exports.deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id: prodID } = req.params;

  const product = await Product.findByIdAndDelete(prodID);

  if (!product) {
    return next(
      new NotFoundError(`No product found with the given ID: ${prodID}`)
    );
  }

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    product: null,
  });
});

exports.searchProduct = asyncWrapper(async (req, res, next) => {
  const products = await Product.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: { $meta: 'textScore' },
    }
  )
    .sort({
      score: { $meta: 'textScore' },
    })
    .limit(5);

  res.status(StatusCodes.OK).json({
    status: 'success',
    counts: products.length,
    products,
  });
});
