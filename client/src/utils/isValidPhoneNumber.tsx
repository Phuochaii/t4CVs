const isValidPhoneNumber = (phone: string) => {
  for (let i = 0; i <= phone.length; i++) {
    if (isNaN(phone[i]) || phone[i] !== '-' || phone[i] !== ' ') {
      return false;
    }
  }
  const onlyNumbers = phone.replace('-' || ' ', '');
  if (onlyNumbers.length !== 10 && onlyNumbers.length !== 11) {
    return false;
  }
  return true;
};

export default isValidPhoneNumber;
