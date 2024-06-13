import { useEffect } from 'react'
import styles from './styles.module.css'
import Button from '@/shared/ui/Button/Button'
import { useRegisterationMutation } from '@/entities/auth/api/baseApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { IUser } from '@/entities/auth/model/types'
import { registerValidateRules } from '@/shared/utils/validateRules'
import { useAppDispatch } from '@/app/appStore'
import { pushErrors } from '@/entities/auth'

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const [registration, { isLoading }] = useRegisterationMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(registerValidateRules)
  })

  const onSubmitHandler = async (data: IUser) => {
    await registration(data)
    reset()
  }

  useEffect(() => {
    dispatch(pushErrors(errors))
  }, [errors, dispatch])

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={styles.inputsWrapper}>
        <input
          style={errors.firstName && { border: '1px solid #F77B7D' }}
          className={styles.input}
          type="text"
          placeholder="FirstName"
          {...register('firstName')}
        />
        <input
          style={errors.lastName && { border: '1px solid #F77B7D' }}
          className={styles.input}
          type="text"
          placeholder="LastName"
          {...register('lastName')}
        />
        <input
          style={errors.email && { border: '1px solid #F77B7D' }}
          className={styles.input}
          type="text"
          placeholder="E-mail"
          {...register('email')}
        />
        <input
          style={errors.phone && { border: '1px solid #F77B7D' }}
          className={styles.input}
          type="text"
          placeholder="Phone"
          {...register('phone')}
        />
        <input
          style={errors.password && { border: '1px solid #F77B7D' }}
          className={styles.input}
          type="text"
          placeholder="Password"
          {...register('password')}
        />
      </div>

      <label className={styles.label}>
        <input type="checkbox" />
        Remember me
      </label>

      <div className={styles.buttonsWrapper}>
        <Button variant="light-form" label="Submit" style={{ width: '100%' }} type="submit" disabled={isLoading} />
      </div>
      <span className={styles.description}>
        This is a website management system; to gain access you need to contact the system administrator.
      </span>
    </form>
  )
}

export default RegisterForm
