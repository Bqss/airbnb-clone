import Content from "../components/content";

export default function IndexPage() {
  const { openLoginModal, openRegisterModal } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Content/>
    </div>
  );
}
