function extend(child, supertype)
{
  child.prototype.__proto__ = supertype.prototype;
}

