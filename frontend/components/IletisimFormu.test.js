import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<App />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const baslik = screen.getByAltText(/İletişim Formu/i);
  expect(baslik).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const inputS = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(inputS, "Baha");
  const errAd = screen.findByTestId("error");
  expect(await errAd).toBeDisable();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {});
render(<IletisimFormu />);
userEvent.click(screen.getByRole("button"));
expect(await screen.findAllByAltText("error")).toHaveLength(3);
test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const inputA = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(inputA, "Gokhan");

  const inputB = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(inputB, "Gokhan Gokhan");

  userEvent.click(screen.getByRole("button"));
  expect(await screen.findByTestId("error")).toBeVisible();

  test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const inputEmail = screen.getAllByPlaceholderText(
      /yüzyılıngolcüsü@hotmail.com/i
    );
    userEvent.type(inputEmail, "birşeybirşey@bombabomba.com");
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "email geçerli bir e mail olmalıdır"
    );
  });
  test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    userEvent.type(inputA, "İlhan");
    const inputC = screen.getByPlaceholderText(/İlhan/i);
    userEvent.type(inputC, "yüzyılıngolcüsü@hotmail.com/");
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toBeVisible();
  });

  test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});
  render(<IletisimFormu />);
  const isiminput = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(isiminput, "Abdullah");

  const soyisiminput = screen.getByPlaceholderText(/Mansız/i);
  userEvent.type(soyisiminput, "Abdullahoğlu");

  const mailinput = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(mailinput, "birşeybirşey@bombabomba.com");

  const submitButton = screen.getByText(/Gönder/i);
  userEvent.click(submitButton);
  await waitFor(
    () => {
      const errorAlani = screen.queryAllByTestId("error");
      expect(errorAlani.length).toBe(0);
    },
    { timeout: 3000 }
  );
  test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
  render(<IletisimFormu />);
  userEvent.type(screen.getByPlaceholderText("İlhan"), "Serhat");
  userEvent.type(screen.getByPlaceholderText("Mansız"), "Mühendis");
  userEvent.type(
    screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com"),
    "birşeybirşey@bombabomba.com"
  );
  userEvent.type(screen.getByText("Mesaj"), "galiba ödev bitti");
  userEvent.click(screen.getByRole("button"));
  expect(await screen.findByTestId("firstnameDisplay")).toHaveTextContent(
    "Serhat"
  );
  expect(await screen.findByTestId("lastnameDisplay")).toHaveTextContent(
    "Mühendis"
  );
  expect(await screen.findByTestId("emailDisplay")).toHaveTextContent(
    "birşeybirşey@bombabomba.com"
  );
  expect(await screen.findByTestId("messageDisplay")).toHaveTextContent(
    "galiba ödev bitti"
  );
});
