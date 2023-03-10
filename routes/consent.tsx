import Drawing from "@/islands/Drawing.tsx";

export default function Consent() {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>James Gordon</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>10/25/2018</td>
          </tr>
          <tr>
            <td>DOB:</td>
            <td>2/9/1962</td>
          </tr>
          <tr>
            <td>License No.:</td>
            <td>JG8743895324</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>724 Liberty Lane Gotham City, NJ 08998 United States</td>
          </tr>
          <tr>
            <td>Mobile Phone:</td>
            <td>212-521-0984</td>
          </tr>
        </tbody>
      </table>

      <p>
        I acknowledge by signing this agreement that I have been given the full
        opportunity to ask any and all questions which I might have about the
        obtaining of a tattoo and that all of my questions have been answered to
        my full satisfaction. I specifically acknowledge I have been advised of
        the facts and matters set forth below and I agree as follows:
      </p>

      <ul>
        <li>
          If I have diabetes, epilepsy, hepatitis, hemophilia, HIV-AIDS, or any
          other communicable disease, heart condition or take medicine which
          thins the blood I have advised my tattooist. I am not pregnant or
          nursing. I am not under the influence of alcohol or drugs.
        </li>
        <li>
          I do not have medical or skin conditions such as but not limited to:
          acne, scarring (Keloid), Eczema, psoriasis, freckles, moles or sunburn
          in the area to be tattooed that may interfere with said tattoo. If I
          have any type of infection or rash anywhere on my body, I will advise
          my tattooist.
        </li>
      </ul>

      <Drawing />
    </div>
  );
}
