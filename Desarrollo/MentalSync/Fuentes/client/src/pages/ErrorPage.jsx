function ErrorPage({ code, message}) {
  return (
    <div>
      <h1>Error {code}</h1>
      <p>{message}</p>
    </div>
  );
}

export default ErrorPage;
