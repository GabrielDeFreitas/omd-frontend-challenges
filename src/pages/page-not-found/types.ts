export interface PageNotFoundProps {
  pageNotFound: {
    content: {
      title: string
      description: string
    }
    actions: {
      label: string
      goToHome: () => void
    }
  }
}
