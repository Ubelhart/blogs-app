const login = async (username, password, page) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (title, author, url, likes, page) => {
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
  await page.locator('input[name="likes"]').fill(likes)
  await page.getByRole('button', { name: 'create' }).click()
  await page.waitForTimeout(150)
}

export { login, createBlog }
