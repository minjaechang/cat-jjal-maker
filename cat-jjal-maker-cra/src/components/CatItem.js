function CatItem(props) {
  return (
    <li>
      <img src={props.img} style={{ width: '150px' }} alt='cat' />
    </li>
  );
}

export default CatItem;
