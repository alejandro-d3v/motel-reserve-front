import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import AppCkeditor from "../../../shared/components/Forms/AppCkeditor";
import AppLoadingProgress from "../../../shared/components/AppLoadingProgress";

import { ServiceDto } from "../dtos/service.dto";

import { CreateOrUpdateServiceService } from "../services/createOrUpdateService.service";

const createOrUpdateServiceService = new CreateOrUpdateServiceService();

interface IProps {
  service?: ServiceDto | null;
}

export default function ServicesForm ({ service }: IProps) {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingCKeditor, setLoadingCKeditor] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoadingCKeditor(false), 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const save = handleSubmit(async (data) => {
    setLoadingSave(true);

    try {
      const dataSend: any = {
        name: data.name, 
        price: data.price ? parseFloat(data.price) : null,
        status: 1,
        description: data.description,
        advancePayment: data.advancePayment ? parseFloat(data.advancePayment) : null,
        longDescription: data.longDescription,
      };

      if (data.file && data.file[0]) dataSend.file = data.file[0];
      if (service?.id && service.urlImg && !(data.file && data.file[0])) dataSend.urlImg = service.urlImg;

      await createOrUpdateServiceService.run(dataSend, service?.id);

      navigate('/admin-service');
    } catch (e) {
      console.log('err', e);
      setLoadingSave(false);
    }

    setLoadingSave(false);
  });

  return (
    <>
      <form className="px-8 pt-4" onSubmit={save}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">{service ? 'Editar Servicio' : 'Agregar Servicio'}</h1>

          <div className="flex gap-2">
            <Link to="/admin-service">
              <button className="btn btn-outline">Volver</button>
            </Link>

            <button className="btn btn-active btn-neutral">Guardar</button>
          </div>
        </div>

        <div className="divider"></div>

        <section>
          {loadingSave && <AppLoadingProgress />}

          <div className="flex space-x-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>

              <input 
                type="text" 
                className="input input-bordered w-full" 
                {...register('name', {
                  value: service?.name,
                  required: {
                    value: true,
                    message: "El nombre es requerido"
                  }
                })}
              />

              {errors.name && <span className="text-red-600 text-right text-xs">{errors.name.message as any}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Imagen</span>
              </label>

              <input 
                type="file"
                className="file-input file-input-bordered w-full" 
                {...register('file')}
              />

              {errors.file && <span className="text-red-600 text-right text-xs">{errors.file.message as any}</span>}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Precio por hora</span>
              </label>

              <input 
                type="number" 
                className="input input-bordered w-full" 
                {...register('price', {
                  value: service?.price,
                  required: {
                    value: true,
                    message: "El precio por hora es requerido"
                  }
                })}
              />

              {errors.price && <span className="text-red-600 text-right text-xs">{errors.price.message as any}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Cuota Mínima</span>
              </label>

              <input 
                type="number" 
                className="input input-bordered w-full" 
                {...register('advancePayment', {
                  value: service?.advancePayment,
                  required: {
                    value: true,
                    message: "La cuota minima es requerida"
                  }
                })}
              />

              {errors.advancePayment && <span className="text-red-600 text-right text-xs">{errors.advancePayment.message as any}</span>}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>

              <textarea 
                className="textarea textarea-bordered h-14"
                {...register('description', {
                  value: service?.description,
                  required: {
                    value: true,
                    message: "La descripción es requerida"
                  }
                })}
              ></textarea>

              {errors.description && <span className="text-red-600 text-right text-xs">{errors.description.message as any}</span>}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="form-control w-full">
              <label className="label">
                <div className="flex flex-col">
                  <span className="label-text">Mas detalles</span>

                  {errors.longDescription && <span className="text-red-600 text-left text-xs">{errors.longDescription.message as any}</span>}
                </div>
              </label>

              {!loadingCKeditor && (
                <AppCkeditor 
                  data={ service?.longDescription as any } 
                  {...register('longDescription', {
                    value: service?.longDescription,
                    required: {
                      value: true,
                      message: "Este campo es requerida"
                    }
                  })}
                  onChange={ (newData) => setValue("longDescription", newData )}
                />
              )}
            </div>
          </div>
        </section>
      </form>
    </>
  );
}