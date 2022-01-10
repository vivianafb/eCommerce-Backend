// export const validateProduct = (req, res, next) => {
//   try {
//     const { nombre, precio, descripcion, codigo, foto, stock, categoria } =
//       req.body;
//       console.log(req.body)
//     if (
//       !nombre ||
//       !precio ||
//       !descripcion ||
//       !codigo ||
//       !stock ||
//       !categoria
//     )
//       return res.status(400).json({ msg: "Campos invalidos" });
//   } catch (err) {
//     res.status(404).json({
//       msg: err,
//     });
//   }
// };
