const moviesApi = 'https://api.nomoreparties.co/beatfilm-movies';
const mainApi = 'https://s1tt-moviemarksearch.nomoredomainsicu.ru/api/';
// const mainApi = 'http://localhost:3000/api/';

const deviceWidth = {
  desktop: {
    cards: {
      initialQuantity: 16,
      subload: 6
    }
  },
  tablet: {
    width: 768,
    cards: {
      initialQuantity: 8,
      subload: 4
    }
  },
  mobile: {
    width: 520,
    cards: {
      initialQuantity: 5,
      subload: 3
    }
  }
};

const cardsOnDeviceWidth = {
  fourCardsInARow: {
    width: 1280,
    columns: 4,
    maxInitialCards: 16
  },
  threeCardsInARow: {
    width: 990,
    columns: 3,
    maxInitialCards: 12
  },
  twoCardsInARow: {
    width: 768,
    columns: 2,
    maxInitialCards: 8
  }
};

const popUpAlertMessages = {
  titles: {
    error: 'Ошибка!',
    success: 'Успешно!'
  },
  messages: {
    errors: {
      updateProfileError: 'Произошла ошибка при обновлении профиля.',
      undefinedError: 'Неизвестная ошибка. Пожалуйста, повторите попытку позже.',
      notLoggedIn: 'Чтобы просматривать эту страницу, пожалуйста, зарегистрируйтесь.',
      emptyField: 'Поле не может быть пустым.'
    },
    success: {
      updateProfileSuccess: 'Данные профиля успешно обновлены.',
      logoutSuccess: 'Вы вышли из аккаунта.'
    }
  }
};

const errorHandler = (error) => {
  switch (error.status) {
    case 400:
      return 'Неправильный запрос. Пожалуйста, проверьте данные и попробуйте снова.';

    case 401:
      return 'Неправильные почта или пароль.';

    case 403:
      return 'Доступ запрещен. У вас нет прав для выполнения этой операции.';

    case 404:
      return 'Страница не найдена. Пожалуйста, проверьте URL и попробуйте снова.';

    case 409:
      return 'Пользователь с таким email уже существует.';

    case 500:
      return 'Внутренняя ошибка сервера. Пожалуйста, повторите попытку позже';

    default:
      return 'Неизвестная ошибка. Пожалуйста, повторите попытку позже';
  }
};

export { cardsOnDeviceWidth, deviceWidth, errorHandler, mainApi, moviesApi, popUpAlertMessages };
