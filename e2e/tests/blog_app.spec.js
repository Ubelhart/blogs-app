import { test, expect } from '@playwright/test'
import { login, createBlog } from './helper'
const { beforeEach, describe } = test

describe('Blog App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Historia',
          username: 'historia',
          password: 'password',
        },
      })
    })

    test('succeeds with the correct credentials', async ({ page }) => {
      await login('historia', 'password', page)
      await expect(page.getByText('Historia logged-in')).toBeVisible()
      await expect(page.getByText('logout')).toBeVisible()
      await expect(page.getByText('create new blog')).toBeVisible()
      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('show less')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await login('admin', 'wrong', page)
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login('historia', 'password', page)
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(
          'My new blog',
          'Juan',
          'http://localhost:5173/blogs/my-new-blog',
          '7',
          page
        )
      })

      test('can create a new blog', async ({ page }) => {
        await expect(page.getByText('My new blog Juan')).toBeVisible()
      })

      test('blog can be edited', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 8')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toBe('Remove blog My new blog by Juan')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
      })

      test('blogs should be ordered by likes from highest to lowest', async ({
        page,
      }) => {
        test.setTimeout(5000)
        await createBlog(
          'My new blog 2',
          'Juan',
          'http://localhost:5173/blogs/my-new-blog-2',
          '8',
          page
        )
        await createBlog(
          'My new blog 3',
          'Juan',
          'http://localhost:5173/blogs/my-new-blog-3',
          '6',
          page
        )

        await page.getByRole('button', { name: 'view' }).first().click()
        await expect(page.getByText('likes: 8')).toBeVisible()

        await page.getByRole('button', { name: 'view' }).first().click()
        await expect(page.getByText('likes: 7')).toBeVisible()

        await page.getByRole('button', { name: 'view' }).first().click()
        await expect(page.getByText('likes: 6')).toBeVisible()
      })
    })
  })
})
